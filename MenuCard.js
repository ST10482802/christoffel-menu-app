```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MenuCard = ({ item }) => {
  const getCourseColor = (course) => {
    switch (course) {
      case 'starter': return '#27ae60';
      case 'main': return '#e67e22';
      case 'dessert': return '#9b59b6';
      default: return '#95a5a6';
    }
  };

  const getCourseEmoji = (course) => {
    switch (course) {
      case 'starter': return '🥗';
      case 'main': return '🍖';
      case 'dessert': return '🍰';
      default: return '🍽️';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.emoji}>{getCourseEmoji(item.course)}</Text>
        </View>
        <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
      </View>

      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}

      <View style={[styles.courseTag, { backgroundColor: getCourseColor(item.course) }]}>
        <Text style={styles.courseText}>
          {item.course.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  emoji: {
    fontSize: 16,
    marginLeft: 8,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  description: {
    fontSize: 14,
    color: '#5d6d7e',
    marginBottom: 12,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  courseTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  courseText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default MenuCard;
```