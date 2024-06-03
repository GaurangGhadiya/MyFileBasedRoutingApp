import React, { useState } from "react";
// import { Barcode } from "expo-barcode-generator";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
  Alert,
  Image,
} from "react-native";
import {
  DataTable,
  Divider,
  IconButton,
  PaperProvider,
  Text,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ViewBarcodeDetails from "../components/ViewBarcodeDetails";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const headers = [
  { key: "name", label: "Barcode", width: 110 },
  { key: "quantity", label: "Name", width: 150 },
  //   { key: "price", label: "Purchase Price (₹)", width: 140 },
  //   { key: "totalPrice", label: "Selling Price (₹)", width: 140 },
  //   { key: "totalPrice", label: "Description", width: 140 },
  { key: "action", label: "Action", width: 110 },
];

const GeneratedDataScreen = ({ data, setIsGenerated, setdata }) => {
  console.log("data", data);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const [dialogData, setDialogData] = useState({});
  const [mode, setMode] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const hideDialog = () => {
    setVisible(false);
    setDialogData({});
    setMode(null);
  };
  const showDialog = (item, mode) => {
    setVisible(true);
    setDialogData(item);
    setMode(mode);
  };

  const handleDelete = (item) => {
    let data1 = [...data];
    let newData = data1?.filter((v) => v?.name !== item?.name);
    setdata(newData);
  };
  return (
    <PaperProvider>
      <View style={styles.main}>
        {data?.length > 0 ? (
          <View style={styles.container}>
            <ScrollView vertical showsVerticalScrollIndicator>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <DataTable>
                  <DataTable.Header>
                    {headers?.map((header, index) => (
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
                  {data?.map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell
                        style={[{ width: headers?.[0].width , paddingVertical : 10}]}
                        contentStyle={styles.cellContent}
                      >
                          <Image
  source={{ uri: `https://bwipjs-api.metafloor.com/?bcid=code128&text=${item}&scale=1` }}
  onError={(error) => console.error('Error loading image:', error)}
  style={{ height: 50, width: 110 }} 
/>            
                        {/* <Barcode
                          value={JSON.stringify(item)}
                          options={{
                            format: "CODE128",
                            displayValue: false,
                            width: 0.09,
                            height: 30,
                          }}
                          style={styles.barcode}
                        /> */}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={[styles.cell, { width: headers?.[1].width }]}
                        contentStyle={styles.cellContent}
                      >
                        <Text style={styles?.cb}>{item.name}</Text>
                      </DataTable.Cell>
                      {/* <DataTable.Cell
                        style={[styles.cell, { width: headers[2].width }]}
                        contentStyle={styles.cellContent}
                      >
                        {item.purchasePrice}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={[styles.cell, { width: headers[3].width }]}
                        contentStyle={styles.cellContent}
                      >
                        {item.sellingPrice}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={[styles.cell, { width: headers[4].width }]}
                        contentStyle={styles.cellContent}
                      >
                        {item?.description}
                      </DataTable.Cell> */}

                      <DataTable.Cell
                        style={[styles.cell, { width: headers?.[2].width }]}
                        contentStyle={styles.cellContent}
                      >
                        <View style={styles.actions}>
                          <IconButton
                            icon="eye"
                            iconColor={"#00A884"}
                            size={24}
                            onPress={() => showDialog(item, "view")}
                          />
                          <IconButton
                            icon="pencil"
                            style={styles.old}
                            iconColor={"#0A8ADC"}
                            size={24}
                            onPress={() => showDialog(item, "edit")}
                          />
                          <IconButton
                            icon="delete"
                            iconColor={"#d32f2f"}
                            size={24}
                            onPress={() => {
                              openModal(item)
                            }}
                          />
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                  {/* <DataTable.Row >
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
                </DataTable.Row> */}
                </DataTable>
              </ScrollView>
            </ScrollView>

            {/* <View style={styles.bottom}>
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
              </View> */}
          </View>
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No Data Found!</Text>
          </View>
        )}

        <Divider />
        <View style={styles.tabbar}>
          <TouchableOpacity
            style={styles.singleTab}
            onPress={() => setIsGenerated(false)}
          >
            <Icon name="barcode-scan" size={26} color={"#0A8ADC"} />
            <RNText style={styles.tabTitle}>Generate Again</RNText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleTab}
            onPress={() => Alert.alert("Barcode Saved!")}
          >
            <Icon name="content-save-outline" size={26} color={"#0A8ADC"} />

            <RNText style={styles.tabTitle}>Save</RNText>
          </TouchableOpacity>
        </View>
      </View>

      <ViewBarcodeDetails
        visible={visible}
        hideDialog={hideDialog}
        dialogData={dialogData}
        mode={mode}
        setdata={setdata}
        data={data}
      />
      <DeleteConfirmationModal 
      isVisible={isModalVisible}
      onConfirm={handleDelete}
      onCancel={closeModal}
      />
    </PaperProvider>
  );
};

export default GeneratedDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  barcode: {
    width: 200,
    height: 100,
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },

  headerText: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16,
    color: "black",
  },
  cell: {
    justifyContent: "center",
    color: "black",
  },
  cell1: {
    fontWeight: "bold",
    fontSize: 15,
    justifyContent: "center",
    color: "black"
  },
  cellContent: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "black"
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
  bottom: {
    padding: 20,
  },
  hori: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "end",
    flexDirection: "row",
    marginVertical: 10,
  },
  head: {
    fontWeight: "bold",
    fontSize: 17,
  },
  val: {
    width: 100,
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "right",
    // marginLeft : 100
  },
  tabbar: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 15,
  },
  tabTitle: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
    // color: "#0A8ADC"
  },
  singleTab: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  old: {
    marginHorizontal: -10,
  },
  cb : {
    color: "black"
  }
});
