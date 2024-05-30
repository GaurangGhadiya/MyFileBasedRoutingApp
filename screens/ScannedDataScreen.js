import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  DataTable,
  Divider,
  IconButton,
  MD3Colors,
  PaperProvider,
  Text,
} from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import QuantityManage from "../components/QuantityManage";
import GstManage from "../components/GstManage";

const headers = [
  { key: "name", label: "Name", width: 130 },
  { key: "quantity", label: "Quantity", width: 80 },
  { key: "price", label: "Price (₹)", width: 70 },
  { key: "totalPrice", label: "Taxable Value (₹)", width: 125 },
  { key: "cgst", label: "CGST (₹)", width: 95 },
  { key: "sgst", label: "SGST (₹)", width: 95 },
  { key: "total", label: "Total (₹)", width: 95 },
  { key: "action", label: "Action", width: 50 },
];

const ScannedDataScreen = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [visibleGst, setVisibleGst] = useState(false)

  console.log(props?.data1)

  const showDialog = (item) => {
    setVisible(true);
    setSelectedItem(item);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedItem(null);
  };
  const showDialogGst = (item) => {
    setVisibleGst(true);
    setSelectedItem(item);
  };

  const hideDialogGst = () => {
    setVisibleGst(false);
    setSelectedItem(null);
  };

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

  const handleChangeQty = (item) => {
    console.log(item);
    let data = [...props?.data1];
    let newData = data?.map((v) =>
      v?.id == item?.id
        ? {
            ...v,
            quantity: item?.quantity,
          }
        : v
    );
    props.setData(newData);
    hideDialog();
  };
  const handleChangeGst = (item) => {
    console.log(item);
    let data = [...props?.data1];
    let newData = data?.map((v) =>
      v?.id == item?.id
        ? {
            ...v,
            gst: item?.quantity,
          }
        : v
    );
    console.log("newData", newData);
    props.setData(newData);
    hideDialogGst();
  };

  return (
    <PaperProvider>
      <View style={styles.main}>
        {props?.data1?.length > 0 ? (
          <View style={styles.container}>
            <ScrollView vertical showsVerticalScrollIndicator>
            <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
              <DataTable>
                <DataTable.Header>
                  {headers.map((header, index) => (
                    <DataTable.Title
                      key={index}
                      style={{
                        width: header.width,
                        justifyContent: index == 0 ? "start" : "center",
                      }}
                    >
                      <Text style={styles.headerText}>{header.label}</Text>
                    </DataTable.Title>
                  ))}
                </DataTable.Header>
                {props?.data1?.map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell
                      style={[{ width: headers[0].width }]}
                      contentStyle={styles.cellContent}
                    >
                      {item.name}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[styles.cell, { width: headers[1].width }]}
                      contentStyle={styles.cellContent}
                      onPress={() => showDialog(item)}
                    >
                      {item.quantity}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[styles.cell, { width: headers[2].width }]}
                      contentStyle={styles.cellContent}
                    >
                      {item.price?.toFixed(2)}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[styles.cell, { width: headers[3].width }]}
                      contentStyle={styles.cellContent}
                    >
                      {(+item?.price * +item?.quantity)?.toFixed(2)}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[styles.cell, { width: headers[4].width }]}
                      contentStyle={styles.cellContent}
                      onPress={() => showDialogGst(item)}
                    >
                      {item?.gst == 0 ? 0 : ((+item?.price * +item?.quantity)*(item.gst/100))?.toFixed(2)}  ({item?.gst == 0 ? 0 :item?.gst/2}%)
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[styles.cell, { width: headers[5].width }]}
                      contentStyle={styles.cellContent}
                      onPress={() => showDialogGst(item)}
                    >
                      {item?.gst == 0 ? 0 : ((+item?.price * +item?.quantity)*(item.gst/100))?.toFixed(2)}  ({item?.gst == 0 ? 0 :item?.gst/2}%)
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[styles.cell, { width: headers[6].width }]}
                      contentStyle={styles.cellContent}
                    >
                      {item?.gst == 0 ?  (+item?.price * +item?.quantity)?.toFixed(2) : ((+item?.price * +item?.quantity)+((+item?.price * +item?.quantity)*(item.gst/100)*2))?.toFixed(2)}
                    </DataTable.Cell>
                 
                    
                    <DataTable.Cell
                      style={[styles.cell, { width: headers[7].width }]}
                      contentStyle={styles.cellContent}
                    >
                      <IconButton
                        icon="delete"
                        iconColor={MD3Colors.error50}
                        size={24}
                        onPress={() => openModal(item)}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
                <DataTable.Row >
                <DataTable.Cell
                  style={[ { width: headers[0].width }]}
                  contentStyle={styles.cellContent}
                >
                                    <Text style={styles.cell1}>Total</Text>

                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.cell, { width: headers[1].width }]}
                  contentStyle={styles.cellContent}
                >
                                    <Text style={styles.cell1}>{props?.data1?.reduce((value, total) => {return value + total?.quantity}, 0)}</Text>

                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.cell1, { width: headers[2].width, fontWeight : 'bold' }]}
                  contentStyle={styles.cellContent}
                >
                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.cell, { width: headers[3].width }]}
                  contentStyle={styles.cellContent}
                >
                  <Text style={styles.cell1}>{props?.data1?.reduce((value, total) => {return value + (total.price * total.quantity)}, 0)?.toFixed(2)}</Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.cell, { width: headers[4].width }]}
                  contentStyle={styles.cellContent}
                  >
                  <Text style={styles.cell1}>{props?.data1?.reduce((value, total) => {return value + (((+total?.price * +total?.quantity)*(total.gst/100)))}, 0)?.toFixed(2)}</Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.cell, { width: headers[5].width }]}
                  contentStyle={styles.cellContent}
                >
                <Text style={styles.cell1}>{props?.data1?.reduce((value, total) => {return value + (((+total?.price * +total?.quantity)*(total.gst/100)))}, 0)?.toFixed(2)}</Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.cell, { width: headers[6].width }]}
                  contentStyle={styles.cellContent}
                >
                 <Text style={styles.cell1}> {props?.data1?.reduce((value, total) => {return value + ((+total?.price * +total?.quantity)+((+total?.price * +total?.quantity)*(total.gst/100)*2))}, 0)?.toFixed(2)}</Text>

                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.cell, { width: headers[7].width }]}
                  contentStyle={styles.cellContent}
                >
                </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </ScrollView>
        </ScrollView>
            

            <View style={styles.bottom}>
            <Divider />
              <View style={styles.hori}>
              <Text style={styles.head}>Taxable Amount</Text>
              <Text style={styles.val}>{props?.data1?.reduce((value, total) => {return value + (total.price * total.quantity)}, 0)?.toFixed(2)}₹</Text></View>
              <View style={styles.hori}>
              <Text style={styles.head}>Total Tax</Text>
              <Text style={styles.val}>{props?.data1?.reduce((value, total) => {return value + (((+total?.price * +total?.quantity)*(total.gst/100)))}, 0)?.toFixed(2)*2}₹</Text>
              </View>
              <View style={styles.hori}>
              <Text style={styles.head}>Invoice Total</Text>
              <Text style={styles.val}>{props?.data1?.reduce((value, total) => {return value + ((+total?.price * +total?.quantity)+((+total?.price * +total?.quantity)*(total.gst/100)*2))}, 0)?.toFixed(2)}₹</Text>
              </View>
             
              <Divider />
              </View>

          </View>
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No Data Found!</Text>
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
        <QuantityManage
          hideDialog={hideDialog}
          visible={visible}
          selectedItem={selectedItem}
          handleChangeQty={handleChangeQty}
        />
        <GstManage 
        hideDialog={hideDialogGst}
        visible={visibleGst}
        selectedItem={selectedItem}
        handleChangeGst={handleChangeGst}
        />
      </View>
    </PaperProvider>
  );
};

export default ScannedDataScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16,
  },
  cell: {
    justifyContent: "center",
  },
  cell1: {
    fontWeight: "bold",
    fontSize: 15,
    justifyContent: "center",
  },
  cellContent: {

    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btn: {
    paddingVertical: 10,
    width: "40%",
    backgroundColor: "blue",
    borderRadius: 15,
  },
  btns: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingBottom: 15,
  },
  save: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  noData: {
    display: "flex",
    justifyContent: "center",
    height: "88%",
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
  },
  bottom : {
    padding : 20
  },
  hori : {
    display : "flex",
    justifyContent : "flex-end",
    alignItems : "end",
    flexDirection : "row",
    marginVertical : 10
  },
  head  :{
    fontWeight : "bold",
    fontSize : 17
  },
  val : {
    width : 100,
    fontWeight : "bold",
    fontSize : 17,
    textAlign : "right"
    // marginLeft : 100
  }
});
