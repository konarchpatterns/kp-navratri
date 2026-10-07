import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const colWidth = (width - 40) / 2;

export default function GalleryScreen() {
  const [activeTab, setActiveTab] = useState<'video' | 'photo'>('video');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>GALLERY</Text>
          <View style={styles.divider}>
            <View style={styles.diamond} />
            <View style={[styles.diamond, styles.diamondCenter]} />
            <View style={styles.diamond} />
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'video' && styles.activeTab]}
            onPress={() => setActiveTab('video')}
          >
            <Text style={[styles.tabText, activeTab === 'video' && styles.activeTabText]}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'photo' && styles.activeTab]}
            onPress={() => setActiveTab('photo')}
          >
            <Text style={[styles.tabText, activeTab === 'photo' && styles.activeTabText]}>Photos</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          {activeTab === 'video' ? (
            <View style={styles.grid}>
              {[1, 2, 3, 4].map((item) => (
                <TouchableOpacity key={item} style={styles.mediaCard} activeOpacity={0.8}>
                  <Image source={{ uri: `https://picsum.photos/400/300?random=${item}` }} style={styles.mediaImage} />
                  <View style={styles.playOverlay}>
                    <View style={styles.playButton}>
                      <Play fill="white" color="white" size={24} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.grid}>
              {[5, 6, 7, 8, 9, 10].map((item) => (
                <TouchableOpacity key={item} style={styles.mediaCard} activeOpacity={0.8}>
                  <Image source={{ uri: `https://picsum.photos/400/400?random=${item}` }} style={styles.mediaImage} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  mediaCard: {
    width: colWidth,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.card,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(234, 176, 78, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  }
});
