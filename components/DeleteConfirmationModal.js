// DeleteConfirmationModal.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const DeleteConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Delete Product</Text>
        <Text>Are you sure you want to delete this item?</Text>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onCancel} />
          <Button title="Delete" onPress={onConfirm} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default DeleteConfirmationModal;
