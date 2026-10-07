import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const plans = [
  {
    title: "SINGLE DAY",
    price: "₹499",
    features: ["Entry for one person", "Access to main garba ground", "Food court access"],
    popular: false
  },
  {
    title: "SEASON PASS",
    price: "₹3,999",
    features: ["Entry for all 9 nights", "VIP ground access", "Separate parking", "Express entry"],
    popular: true
  },
  {
    title: "FAMILY PASS",
    price: "₹12,999",
    features: ["Entry for 4 persons (9 nights)", "VIP ground access", "Valet parking", "Dedicated seating area", "Complimentary water"],
    popular: false
  }
];

export default function TicketsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>TICKETS</Text>
          <View style={styles.divider}>
            <View style={styles.diamond} />
            <View style={[styles.diamond, styles.diamondCenter]} />
            <View style={styles.diamond} />
          </View>
        </View>

        {plans.map((plan, index) => (
          <View key={index} style={[styles.card, plan.popular && styles.popularCard]}>
            {plan.popular && (
              <LinearGradient
                colors={['#EAB04E', '#B77F21']}
                style={styles.popularBadge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </LinearGradient>
            )}
            
            <View style={styles.cardHeader}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <Text style={styles.perPerson}>per person</Text>
            </View>
            
            <View style={styles.features}>
              {plan.features.map((feat, i) => (
                <View key={i} style={styles.featureRow}>
                  <Check size={18} color={Colors.primary} />
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={styles.buyButton} activeOpacity={0.8}>
              <LinearGradient
                colors={['#EAB04E', '#B77F21']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>BOOK NOW</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
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
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 24,
    marginBottom: 20,
    position: 'relative',
  },
  popularCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
    paddingTop: 36,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -70 }],
    width: 140,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
  },
  popularText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  planTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 10,
  },
  planPrice: {
    color: Colors.text,
    fontSize: 36,
    fontWeight: 'bold',
  },
  perPerson: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  features: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    color: Colors.text,
    fontSize: 14,
  },
  buyButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
});
