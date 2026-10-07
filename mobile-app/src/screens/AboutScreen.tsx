import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Moon, Star, Landmark, Music } from 'lucide-react-native';

export default function AboutScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Navratri</Text>
          <View style={styles.headerRight} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} bounces={false} showsVerticalScrollIndicator={false}>
        {/* Top Image */}
        <Image 
          source={require('../../assets/images/toran2.jpg')} 
          style={styles.topImage} 
        />

        {/* Content Container */}
        <View style={styles.content}>
          <Text style={styles.title}>The Spirit of Navratri</Text>
          <Text style={styles.description}>
            Navratri is a vibrant celebration of faith, culture and the divine feminine energy. It brings people together through music, dance and devotion.
          </Text>

          {/* Grid of Stats */}
          <View style={styles.statsGrid}>
            
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Moon size={24} color={Colors.primary} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>9</Text>
                <Text style={styles.statLabel}>Nights</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Star size={24} color={Colors.primary} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>9</Text>
                <Text style={styles.statLabel}>Forms of Shakti</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Landmark size={24} color={Colors.primary} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>1</Text>
                <Text style={styles.statLabel}>City</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Music size={24} color={Colors.primary} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>Unlimited</Text>
                <Text style={styles.statLabel}>Celebration</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Bottom Image */}
        <Image 
          source={require('../../assets/images/vg1.png')} 
          style={styles.bottomImage} 
        />
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
    width: 44, // To balance the back button width
  },
  scrollView: {
    flex: 1,
  },
  topImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#3b181a', // Slightly lighter maroon
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTextContainer: {
    flex: 1,
  },
  statValue: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  bottomImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  }
});
