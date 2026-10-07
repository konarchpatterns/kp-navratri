import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors } from '../constants/Colors';
import { Menu, User, MapPin, Play, Calendar, Users, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <ImageBackground 
          source={require('../../assets/images/kv.png')} 
          style={styles.heroBackground}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={['rgba(58,12,21,0.6)', 'rgba(58,12,21,0.2)', 'rgba(58,12,21,1)']}
            style={styles.gradientOverlay}
          >
            <SafeAreaView style={styles.safeArea}>
              
              {/* HEADER */}
              <View style={styles.header}>
                <TouchableOpacity>
                  <Menu color={Colors.text} size={28} />
                </TouchableOpacity>
                <Image source={require('../../assets/images/logo.webp')} style={styles.logo} resizeMode="contain" />
                <TouchableOpacity>
                  <User color={Colors.text} size={28} />
                </TouchableOpacity>
              </View>

              {/* HERO CONTENT */}
              <View style={styles.heroContent}>
                <Image source={require('../../assets/images/logo.webp')} style={styles.mainLogo} resizeMode="contain" />
                <Text style={styles.titleText}>VADODARA{'\n'}VIBRANT{'\n'}NAVRATRI{'\n'}2026</Text>
                
                <Text style={styles.dateText}>11 - 19 OCTOBER 2026</Text>
                <View style={styles.locationContainer}>
                  <MapPin color={Colors.textSecondary} size={16} />
                  <Text style={styles.locationText}>VVN GARBA GROUND{'\n'}VADODARA</Text>
                </View>

                {/* BUTTONS */}
                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Ticket Register Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Play color={Colors.primary} size={20} style={{marginRight: 8}} />
                  <Text style={styles.secondaryButtonText}>Watch Video</Text>
                </TouchableOpacity>
              </View>
              
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>

        {/* QUICK ACCESS SECTION */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            
            <TouchableOpacity style={styles.quickAccessCard}>
              <Info color={Colors.primary} size={32} />
              <Text style={styles.quickAccessText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessCard} onPress={() => navigation.navigate('Singers')}>
              <Users color={Colors.primary} size={32} />
              <Text style={styles.quickAccessText}>Singers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessCard}>
              <Calendar color={Colors.primary} size={32} />
              <Text style={styles.quickAccessText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessCard}>
              <MapPin color={Colors.primary} size={32} />
              <Text style={styles.quickAccessText}>Venue</Text>
            </TouchableOpacity>

          </View>
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
  heroBackground: {
    width: '100%',
    height: 700,
  },
  heroImage: {
    objectFit: 'cover',
  },
  gradientOverlay: {
    flex: 1,
    paddingHorizontal: 20,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  mainLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  titleText: {
    color: Colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    lineHeight: 34,
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  dateText: {
    color: Colors.text,
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  locationText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 8,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  quickAccessSection: {
    padding: 20,
    marginTop: -20, // Pull up over the gradient a bit
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessCard: {
    backgroundColor: Colors.card,
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickAccessText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
});
