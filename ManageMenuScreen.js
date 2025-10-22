import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';

const courses = [
  { label: 'Starter 🥗', value: 'starter' },
  { label: 'Main Course 🍖', value: 'main' },
  { label: 'Dessert 🍰', value: 'dessert' },
];

const ManageMenuScreen = ({ navigation }) => {
  const { menuItems, addMenuItem, removeMenuItem } = useMenu();

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('starter');
  const [price, setPrice] = useState('');

  const handleAddMenuItem = () => {
    if (!dishName.trim()) {
      Alert.alert('Oops!', 'Please enter a dish name');
      return;
    }

    if (!price.trim()) {
      Alert.alert('Oops!', 'Please enter a price');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price amount');
      return;
    }

    addMenuItem({
      name: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: priceValue
    });

    setDishName('');
    setDescription('');
    setSelectedCourse('starter');
    setPrice('');

    Alert.alert('Success!', `${dishName} has been added to the menu`);
  };

  const handleRemoveItem = (id, name) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${name}" from the menu?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeMenuItem(id)
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add a New Dish</Text>

          <TextInput
            style={styles.input}
            placeholder="What's the dish called?"
            value={dishName}
            onChangeText={setDishName}
            placeholderTextColor="#999"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the dish (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#999"
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Course Type:</Text>
            <Picker
              selectedValue={selectedCourse}
              onValueChange={(itemValue) => setSelectedCourse(itemValue)}
              style={styles.picker}
            >
              {courses.map((course) => (
                <Picker.Item
                  key={course.value}
                  label={course.label}
                  value={course.value}
                />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price in Rands"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={[
              styles.addButton,
              (!dishName.trim() || !price.trim()) && styles.addButtonDisabled
            ]}
            onPress={handleAddMenuItem}
            disabled={!dishName.trim() || !price.trim()}
          >
            <Text style={styles.addButtonText}>Add to Menu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Current Menu Items ({menuItems.length})
          </Text>

          {menuItems.map((item, index) => (
            <View key={item.id} style={[
              styles.menuItem,
              index === menuItems.length - 1 && styles.lastMenuItem
            ]}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {item.name} - R{item.price.toFixed(2)}
                </Text>
                {item.description ? (
                  <Text style={styles.itemDescription}>{item.description}</Text>
                ) : null}
                <Text style={styles.itemCourse}>
                  {item.course.charAt(0).toUpperCase() + item.course.slice(1)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemoveItem(item.id, item.name)}
              >
                <Text style={styles.deleteButtonText}>🗑️ Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

          {menuItems.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Your menu is empty</Text>
              <Text style={styles.emptySubtext}>Add some dishes above to get started!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  picker: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
    lineHeight: 18,
  },
  itemCourse: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
  },
});

export default ManageMenuScreen;