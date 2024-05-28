import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const ScannedDataScreen = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    props.setData((prevData) =>
      prevData.filter((item) => item?.id !== selectedItem?.id)
    );
    closeModal();
  };

  return (
    <View style={styles.main}>
      {props?.data1?.length > 0 ? (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.cell1}>Name</Text>
            <Text style={styles.cell2}>Price</Text>
            <Text style={styles.cell3}>Quantity</Text>
            <Text style={styles.cell4}>Total Price</Text>
            <Text style={styles.cell5}>Action</Text>
          </View>
          {props?.data1?.map((v) => (
            <View style={styles.row} key={v?.id}>
              <Text style={styles.cell1}>{v?.name}</Text>
              <Text style={styles.cell2}>{v?.price}₹</Text>
              <Text style={styles.cell3}>
                <View><FontAwesome6 name="minus" size={18} color="black" onPress={() => props.decreaseQty(v)}/></View>
                <View><Text style={styles.qty}>{v?.quantity}</Text></View>
                <View><FontAwesome6 name="add" size={18} color="black" onPress={() => props.increaseQty(v)}/></View>
              </Text>
              <Text style={styles.cell4}>{+v?.price * +v?.quantity}₹</Text>
              <Text style={styles.cell5}>
                {/* kj */}
                <MaterialIcons
                  style={styles.delete}
                  name="delete-forever"
                  size={24}
                  color="red"
                  onPress={() => openModal(v)}
                />
              </Text>
            </View>
          ))}

          <View style={styles.row}>
            <Text style={styles.cell1}></Text>
            <Text style={styles.cell2}></Text>
            <Text style={styles.cell3}></Text>
            <Text style={styles.cell4}>
              {props?.data1?.reduce((total, item) => {
                return total + item.price * item.quantity;
              }, 0)}
              ₹
            </Text>
            <Text style={styles.cell5}></Text>
          </View>
        </View>
      ) : (
        <View style={styles?.noData}>
          <Text style={styles?.noDataText}>No Data Found!</Text>
        </View>
      )}
      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.setScanned(false)}
        >
          <Text style={styles.save}>Scan Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      </View>
      <DeleteConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleDelete}
        onCancel={closeModal}
      />
    </View>
  );
};

export default ScannedDataScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // height : "100%",
    justifyContent: "space-between",
  },
  container: {
    borderWidth: 1,
    //   flex : 1,
    borderColor: "#000",
    borderRadius: 5,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    //   justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,

    borderBottomColor: "#000",
  },
  cell: {
    flex: 1,
    textAlign: "start",
    width: "20%",
  },
  cell1: {
    //   flex: 1,
    textAlign: "start",
    width: "30%",
  },
  cell2: {
    //   flex: 1,
    textAlign: "center",
    width: "15%",
  },
  cell3: {
      // flex: 1,
    textAlign: "center",
    height : 20,
    flexDirection: "column",
    display : "flex",
    alignItems: "center",
    width: "21%",
  },
  qty : {
    marginHorizontal : 5,
    paddingHorizontal : 5,
  },
  cell4: {
    //   flex: 1,
    textAlign: "center",
    width: "22%",
  },
  cell5: {
    //   flex: 1,
    textAlign: "center",
    width: "12%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    //   paddingRight : 2
  },
  delete: {
    // marginTop : "-10px"
    // textAlign: 'center',
  },
  btn: {
    paddingVertical: 10,
    width: "45%",
    backgroundColor: "blue",
    borderRadius: 15,
  },
  btns: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 10,
  },
  save: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  noData: {
    // textAlign: "center",
    // flex : 1,
    display: "flex",
    justifyContent: "center",
    height: "88%",
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
  },
});
