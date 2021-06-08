import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  singleAddToFavoritesButton: {
    position: 'absolute',
    top: 5,
    right: 90,
  },
  composerImage: {
    aspectRatio: 1,
    width: 95,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  excerptContainer: {
    paddingBottom: 20,
  },
  metaInfoContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  youtubeHeading: {
    fontSize: 28,
    paddingTop: 10,
  },
  youtubeLinksContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 70,
    borderTopColor: colors.greenDark,
    borderTopWidth: 2,
  },
});
