import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const singers = [
  { id: 1, name: "Gautam Dabir", role: "Vocalist", image: require('../../assets/images/singers/singer1.jpg') },
  { id: 2, name: "Dr. Vaishali Rajesh", role: "Vocalist", image: require('../../assets/images/singers/singer2.jpg') },
  { id: 3, name: "Divya Kumar", role: "Vocalist", image: require('../../assets/images/singers/singer3.jpg') },
  { id: 4, name: "Bhoomi Trivedi", role: "Vocalist", image: require('../../assets/images/singers/singer4.jpg') },
  { id: 5, name: "Osman Mir", role: "Vocalist", image: require('../../assets/images/singers/singer5.jpg') },
  { id: 6, name: "Kirtidan Gadhvi", role: "Vocalist", image: require('../../assets/images/singers/singer6.jpg') },
];

export default function SingersScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>OUR SINGERS</Text>
          <View style={styles.divider}>
            <View style={styles.diamond} />
            <View style={[styles.diamond, styles.diamondCenter]} />
            <View style={styles.diamond} />
          </View>
        </View>

        <View style={styles.grid}>
          {singers.map((singer) => (
            <TouchableOpacity key={singer.id} style={styles.card} activeOpacity={0.9}>
              <View style={styles.imageContainer}>
                <Image source={singer.image} style={styles.image} />
              </View>
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{singer.name}</Text>
                  <Text style={styles.role}>{singer.role}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <ChevronRight size={20} color={Colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: { 
    flex: 1, 
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: 2,
    marginBottom: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  diamond: {
    width: 6,
    height: 6,
    backgroundColor: Colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  diamondCenter: {
    width: 10,
    height: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  role: {
    color: Colors.primary,
    fontSize: 12,
  },
  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(234, 176, 78, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
