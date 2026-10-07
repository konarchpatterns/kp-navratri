import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, MapPin, Route, Car, Users, 
  Utensils, ShieldCheck, Plus, Ticket, Video, 
  Navigation
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const features = [
  { icon: Route, text: "Excellent Connectivity" },
  { icon: MapPin, text: "Various Approach Roads" },
  { icon: Car, text: "Ample Parking" },
  { icon: Users, text: "Spacious Dancing Arena" },
  { icon: Utensils, text: "Food Courts" },
  { icon: ShieldCheck, text: "Secured Environment" },
  { icon: Users, text: "Public Utilities" },
  { icon: Plus, text: "Medical / First-aid" },
  { icon: Ticket, text: "Box Office" },
  { icon: Video, text: "CCTV Surveillance" },
];

export default function VenueScreen({ navigation }: any) {
  const openMaps = () => {
    Linking.openURL("https://maps.google.com/?q=BRG+Campus+Vadodara");
  };

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
          <Text style={styles.headerTitle}>Venue Details</Text>
          <View style={styles.headerRight} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} bounces={false} showsVerticalScrollIndicator={false}>
        
        {/* Top Image */}
        <Image 
          source={require('../../assets/images/venue_gold_pattern.jpg')} 
          style={styles.topImage} 
        />

        <View style={styles.content}>
          <Text style={styles.kicker}>ABOUT THE VENUE</Text>
          <Text style={styles.title}>VVN GARBA GROUND</Text>
          
          <View style={styles.addressBox}>
            <MapPin size={24} color={Colors.primary} style={{ marginTop: 2 }} />
            <Text style={styles.addressText}>
              BRG Campus, Near Hanumanji Mandir,{'\n'}
              Maharaja Chowk, Sun Pharma Road,{'\n'}
              Vadodara, Gujarat.
            </Text>
          </View>

          <TouchableOpacity style={styles.directionsBtn} onPress={openMaps} activeOpacity={0.8}>
            <Navigation size={20} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.directionsBtnText}>GET DIRECTIONS</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.diamond} />
            <View style={[styles.diamond, styles.diamondCenter]} />
            <View style={styles.diamond} />
          </View>

          <Text style={styles.featuresTitle}>VENUE HIGHLIGHTS</Text>

          <View style={styles.featuresGrid}>
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.iconContainer}>
                    <Icon size={24} color={Colors.primary} />
                  </View>
                  <Text style={styles.featureText}>{item.text}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Bottom Dancers Image */}
        <Image 
          source={require('../../assets/images/venue_dancers_bg.png')} 
          style={styles.bottomImage} 
          resizeMode="contain"
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
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  topImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    marginTop: -20, // Overlap the image slightly
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  kicker: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: Colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 20,
  },
  addressBox: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
    gap: 12,
  },
  addressText: {
    color: Colors.text,
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
  directionsBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  directionsBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 30,
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
  featuresTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureItem: {
    width: (width - 52) / 2, // 2 columns with 12 gap and 40 padding
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(234, 176, 78, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomImage: {
    width: '100%',
    height: 150,
    marginTop: 20,
    marginBottom: 40,
    opacity: 0.8,
  }
});
