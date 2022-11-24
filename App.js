import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'

export default function App() {
  const [vendedores, setVendedores] = useState([])
  const [ventas, setventas] = useState([])

  const consultarVendedores = () =>{
    axios.get('http://localhost:3000/api/vendedores')
    .then((response)=>{
      setVendedores(response.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const agregarVendedor = () =>{
    axios.post('http://localhost:3000/api/vendedores')
    .then((response)=>{
      console.log(response)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const consultarVentas = async() =>{
    await axios.get('http://localhost:3000/api/ventas')
    .then((response)=>{
      setventas(response.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const agregarVentas = () =>{
    axios.post('http://localhost:3000/api/ventas')
    .then((response)=>{
      console.log(response)
    }).catch((err)=>{
      console.log(response)
    })
  }

  useEffect(() => {
    consultarVendedores()
    consultarVentas()
  }, [])

  console.log(ventas)
  console.log(vendedores)
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
