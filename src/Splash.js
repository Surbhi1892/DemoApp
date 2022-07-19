import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import ConnectivityManager from 'react-native-connectivity-status'
import {request, PERMISSIONS,requestNotifications,checkNotifications, checkMultiple} from 'react-native-permissions';

function Splash(props) {
  const {navigation} = props;


  const [bluetoothStatus,setBluetoothStatus]  = useState('OFF')
  const [locationStatus,setLocationStatus]  = useState('OFF')

  const [notificationStatus,setNotificationStatus]  = useState('OFF')


  useEffect(() => {
    _checkPermission();
  }, []);

  const _checkPermission = async () => 
  {
    checkNotifications().then(({status, settings}) => {
      console.log("notify_status:"+status)
      setNotificationStatus(status)
    })

    if(Platform.OS === 'ios')
    {
     
      checkMultiple([PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then((statuses) => {
     })

      setBluetoothStatus(statuses[PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL])
      setLocationStatus(statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE])
    }
    else

    {
       checkMultiple([PERMISSIONS.ANDROID.BLUETOOTH_CONNECT, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((statuses) => {
       
        setBluetoothStatus(statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT])
        setLocationStatus(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])
      })

      const bluetoothIsOn = await ConnectivityManager.isBluetoothEnabled()
      if(bluetoothIsOn)
      {
         setBluetoothStatus("ON")
      }
      else
      {
        setBluetoothStatus("OFF")
      }
    }
  };



  requestBluetoothPermission=()=>
  {
    if(Platform.OS === 'ios')
    {
    request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL)
    .then((result) => {
    
      setBluetoothStatus(result)
    })
    }
    
  }

  requestNotificationPermission= () =>
  {
   
    if(Platform.OS === 'ios')
    {
      requestNotifications(['alert', 'sound']).then(({status, settings}) => {
          
        setNotificationStatus(status)

     
      });
    }
  }

  requestLocationPermission = () =>
  {
    
    if(Platform.OS === 'ios')
    {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    .then((result) => {
    
      setLocationStatus(result)
    })
    }
    else
    {
     
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result)=>{
           
            setLocationStatus(result)
          })
       
      } catch (err) {
        console.warn(err)
      }
    }
  }
  

  return (
    <View style ={{flex:1,paddingTop:"30%"}}>
      <StatusBar backgroundColor={'grey'} barStyle={'dark-content'} />
      <TouchableOpacity  style={styles.button_style} 
      onPress = {() =>
        {
      
      requestBluetoothPermission()
    }

         } >
        <Text style ={styles.text}>Bluetooth -- {(bluetoothStatus)}</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button_style}  onPress = {()=>requestNotificationPermission()} >
        <Text style ={styles.text}>Push Notification -- {(notificationStatus)}</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button_style}  onPress = {()=>requestLocationPermission()} >
        <Text style ={styles.text}>Location -- {(locationStatus)}</Text>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({

  button_style:
   {
    margin: 20,
    padding:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'blue'
  },

  text:
  {
    color:'white',
    fontSize:15
  }
});

export default Splash;
