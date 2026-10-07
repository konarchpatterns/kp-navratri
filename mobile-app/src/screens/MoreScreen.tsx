import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, MapPin, Users, Shield, Phone, ChevronRight } from 'lucide-react-native';

const menuItems = [
  { id: 'about', title: 'About Navratri', icon: Info },
  { id: 'location', title: 'Venue & Location', icon: MapPin },
  { id: 'associates', title: 'Our Associates', icon: Users },
  { id: 'guidelines', title: 'Guidelines & Safety', icon: Shield },
  { id: 'contact', title: 'Contact Support', icon: Phone },
];

export default function MoreScreen({ navigation }: any) {
  const handlePress = (id: string) => {
    if (id === 'about') {
      navigation.navigate('About');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/logo.webp')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Navratri 2026</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.menuItem} 
                activeOpacity={0.7}
                onPress={() => handlePress(item.id)}
              >
                <View style={styles.menuIconContainer}>
                  <Icon size={22} color={Colors.primary} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRight size={20} color={Colors.textSecondary} opacity={0.5} />
              </TouchableOpacity>
            );
          })}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ♥ in Gujarat</Text>
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
    marginVertical: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  version: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  menuContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(234, 176, 78, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 12,
    opacity: 0.7,
  }
});
