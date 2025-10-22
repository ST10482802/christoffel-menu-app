```jsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import MenuCard from '../components/MenuCard';
import StatsPanel from '../components/StatsPanel';

const HomeScreen = ({ navigation }) => {
  const { menuItems } = useMenu();

  const calculateStats = () => {
    const totalItems = menuItems.length;

    const starters = menuItems.filter(item => item.course === 'starter');
    const mains = menuItems.filter(item => item.course === 'main');
    const desserts = menuItems.filter(item => item.course === 'dessert');

    const calculateAverage = (items) => {
      if (items.length === 0) return 0;
      const total = items.reduce((sum, item) => sum + item.price, 0);
      return total / items.length;
    };

    return {
      totalItems,
      avgStarters: calculateAverage(starters),
      avgMains: calculateAverage(mains),
      avgDesserts: calculateAverage(desserts)
    };
  };

  const stats = calculateStats();

  return (
    <View style={styles.container}>
      <StatsPanel stats={stats} />

      <ScrollView style={styles.menuList}>
        {menuItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No menu items yet!</Text>
            <Text style={styles.emptySubtext}>Tap "Manage Menu" to add some dishes</Text>
          </View>
        ) : (
          menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))
        )}
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ManageMenu')}
        >
          <Text style={styles.buttonText}>MANAGE MENU</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => Alert.alert('Coming Soon', 'Filter feature will be available in the final version!')}
        >
          <Text style={styles.buttonText}>FILTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  menuList: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;
```
