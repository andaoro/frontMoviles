import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TextInput } from "react-native-web";

export default function App() {
  const [ventas, setventas] = useState([]);

  const Tab = createBottomTabNavigator();

  const agregarVendedor = () => {
    axios
      .post("http://localhost:3000/api/vendedores")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const consultarVentas = async () => {
    await axios
      .get("http://localhost:3000/api/ventas")
      .then((response) => {
        setventas(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const agregarVentas = () => {
    axios
      .post("http://localhost:3000/api/ventas")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(response);
      });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ventas" component={VentasComponent} />
        <Tab.Screen name="Vendedor" component={VendedorComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const VendedorComponent = (navigate) => {
  //Estados Vendedor
  const [idVendedor, setidVendedor] = useState("");
  const [nombreVendedor, setnombreVendedor] = useState("");
  const [correoVendedor, setcorreoVendedor] = useState("");
  const [totalComision, settotalComision] = useState(0);
  const [error, seterror] = useState("");

  const [vendedores, setVendedores] = useState([]);

  const consultarVendedores = () => {
    axios
      .get("http://localhost:3000/api/vendedores")
      .then((response) => {
        setVendedores(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    consultarVendedores();
  }, [idVendedor]);

  const consultarDatosVendedor = () => {
    let encontrar = vendedores.find(
      (vendedor) => vendedor.identificacion == idVendedor
    );

    if (encontrar) {
      console.log(encontrar);
      setnombreVendedor(encontrar.nombre);
      setcorreoVendedor(encontrar.email);
      settotalComision(encontrar.totalcomision);
      seterror("");
    } else {
      setnombreVendedor("");
      setcorreoVendedor("");
      settotalComision("");
      seterror("Vendedor No encontrado");
    }
  };

  const registrarVendedor = () => {
    let encontrar = vendedores.find(
      (vendedor) => vendedor.identificacion == idVendedor
    );
    if (idVendedor !== '') {
      if (nombreVendedor !== '') {
        if (correoVendedor !== '') {
          /* if(encontrar){
            axios.put(`http://localhost:3000/api/vendedores/${idVendedor}`{
              identificacion: idVendedor,
              nombre: nombreVendedor,
              email: correoVendedor,
            }).then((response))
          } */
          axios
            .post("http://localhost:3000/api/vendedores", {
              identificacion: idVendedor,
              nombre: nombreVendedor,
              email: correoVendedor,
            })
            .then((response) => {
              console.log(response)
              if(response.status === 200){
                setidVendedor("")
                setnombreVendedor("");
                setcorreoVendedor("");
                settotalComision("");
                seterror("Vendedor Resgitrado");
              }

              if(response.status === 400){
                
              }
              
            })
            .catch((err) => {
              seterror(response.response.data.error)
            });
        }else{
          seterror('El correo es necesario')
        }
      }else{
        seterror('El nombre es necesario')
      }
    }else{
      seterror('La identificacion es necesaria')
    }
  };

  return (
    <View style={styles.container}>
      <Text>Ventas</Text>
      <View style={styles.bodys}>
        <TextInput
          value={idVendedor}
          placeholder={"Id del Vendedor"}
          style={styles.inputs2}
          onChange={(e) => {
            setidVendedor(e.target.value);
          }}
        />
      </View>
      <View style={styles.bodys}>
        <TextInput
          value={nombreVendedor}
          placeholder={"Nombre Vendedor"}
          style={styles.inputs2}
          onChange={(e) => {
            setnombreVendedor(e.target.value);
          }}
        />
      </View>
      <View style={styles.bodys}>
        <TextInput
          value={correoVendedor}
          placeholder={"Correo vendedor"}
          style={styles.inputs2}
          onChange={(e) => {
            setcorreoVendedor(e.target.value);
          }}
        />
      </View>
      <View style={styles.bodys}>
        <TextInput
          value={totalComision}
          placeholder={"Total de Comision"}
          style={styles.inputs2}
          editable={false}
          selectTextOnFocus={false}
        />
      </View>

      <View style={styles.bodys}>
        <Button
          title="Registrar Vendedor"
          style={styles.button}
          onPress={() => {
            registrarVendedor();
          }}
        />
      </View>

      <View style={styles.bodys}>
        <Button
          title="Consultar Vendedor por Identificacion"
          style={styles.buttonConsultar}
          onPress={() => {
            consultarDatosVendedor();
          }}
        />

        <Text style={styles.error}>{error}</Text>
      </View>
    </View>
  );
};

const VentasComponent = (navigate) => {
  //Estados ventas
  const [idvendedorVenta, setidvendedorVenta] = useState("");
  const [zonaVenta, setzonaVenta] = useState("");
  const [valorVenta, setvalorVenta] = useState('');
  const [fechaVenta, setfechaVenta] = useState("");
  const [error, seterror] = useState('');

  const AgregarVenta = () =>{
    if(idvendedorVenta !== ''){
      if(zonaVenta !== '' && zonaVenta.toLowerCase() == "sur" || zonaVenta.toLowerCase() == "norte"){
        if(valorVenta !== ''){
          axios.post("http://localhost:3000/api/ventas",{
            identificacion:idvendedorVenta,
            zona:zonaVenta,
            valorventa:valorVenta
          }).then((response)=>{
            if(response.status === 200){
            setidvendedorVenta('')
            setzonaVenta('')
            setvalorVenta('')
            seterror('Venta Agregada')
            }
            console.log(response.response.data.error)
            if(response.status === 400){
            }
          }).catch((err)=>{
            seterror(err.response.data.error)

          })
        }else{
          seterror("digite un valor")
        }
      }else{
        seterror("digite una zona valida (sur o norte)")
      }
    }else{
      seterror("El id del vendedor es necesario")
    }
  }


  return (
    <View style={styles.container}>
      <Text>Ventas</Text>
      <View style={styles.bodys}>
        <TextInput
          value={idvendedorVenta}
          placeholder={"Id del Vendedor"}
          style={styles.inputs2}
          onChange={(e) => {
            setidvendedorVenta(e.target.value);
          }}
        />
      </View>
      <View style={styles.bodys}>
        <TextInput
          value={zonaVenta}
          placeholder={"Zona (Sur o Norte)"}
          style={styles.inputs2}
          onChange={(e) => {
            setzonaVenta(e.target.value);
          }}
        />
      </View>
      <View style={styles.bodys}>
        <TextInput
          value={valorVenta}
          placeholder={"Valor Venta"}
          style={styles.inputs2}
          onChange={(e) => {
            setvalorVenta(e.target.value);
          }}
        />
      </View>
      

      <View style={styles.bodys}>
        <Button title="Registrar Venta" style={styles.button} onPress={()=>{
          AgregarVenta()
        }} />

        <Text style={styles.error}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bodys: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    flexDirection: "column",
  },
  inputs: {
    borderColor: "#000",
    textAlign: "center",
    backgroundColor: "purple",
    borderRadius: "8px",
    color: "#fff",
    paddingVertical: "1rem",
  },
  button: {
    backgroundColor: "blue",
  },
  buttonConsultar: {
    backgroundColor: "grey",
  },
  inputs2: {
    borderRadius: 10,
    padding: 10,
    color: "blue",
    borderColor: "green",
    borderWidth: 1,
    textAlign: "center",
    marginTop: 50,
  },

  error:{
    color:'red',
    textTransform:"uppercase",
    fontWeight:"bold"
  }
});
