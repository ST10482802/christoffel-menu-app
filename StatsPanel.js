```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsPanel = ({ stats }) => {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Menu Statistics</Text>

      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Total Items:</Text>
        <Text style={styles.statValue}>{stats.totalItems}</Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Starters Avg:</Text>
        <Text style={styles.statValue}>R {stats.avgStarters.toFixed(2)}</Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Mains Avg:</Text>
        <Text style={styles.statValue}>R {stats.avgMains.toFixed(2)}</Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Desserts Avg:</Text>
        <Text style={styles.statValue}>R {stats.avgDesserts.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  statLabel: {
    fontSize: 15,
    color: '#555',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#27ae60',
  },
});

export default StatsPanel;
```