import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const associates = [
  { name: "Rahul Sharma", role: "Lead Event Director", image: require('../../assets/images/coord_1.jpg') },
  { name: "Priya Patel", role: "Stage Coordinator", image: require('../../assets/images/coord_2.jpg') },
  { name: "Amit Desai", role: "Logistics Manager", image: require('../../assets/images/coord_3.jpg') },
  { name: "Sneha Joshi", role: "Guest Relations", image: require('../../assets/images/coord_4.jpg') },
  { name: "Vikram Singh", role: "Security Chief", image: require('../../assets/images/coord_5.jpg') },
  { name: "Anjali Mehta", role: "Vendor Management", image: require('../../assets/images/coord_6.jpg') },
];

export default function AssociatesScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Our Associates</Text>
          <View style={styles.headerRight} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>MEET THE TEAM</Text>
          <View style={styles.divider}>
            <View style={styles.diamond} />
            <View style={[styles.diamond, styles.diamondCenter]} />
            <View style={styles.diamond} />
          </View>
          <Text style={styles.subtitle}>
            The dedicated event coordinators working tirelessly to make Navratri 2026 a grand success.
          </Text>
        </View>

        <View style={styles.grid}>
          {associates.map((associate, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={associate.image} style={styles.image} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{associate.name}</Text>
                <Text style={styles.role}>{associate.role}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerSafeArea: {
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    height: 56,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
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
  subtitle: {
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
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
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
    alignItems: 'center',
  },
  name: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  role: {
    color: Colors.primary,
    fontSize: 11,
    textAlign: 'center',
  },
});
