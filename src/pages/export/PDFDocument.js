import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { SVGLogo } from './SVGLogo';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
});

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 9,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  section: {
    textAlign: 'center',
    flex: '0 0 50%',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 14,
    lineHeight: 1.3,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hymnal: {
    lineHeight: 1.3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    fontSize: 9 * 0.9,
    bottom: 15,
    left: 0,
    right: 0,
    color: '#74787b',
    paddingLeft: 35,
    paddingRight: 35,
  },
});

export function PDFDocument({ hymnals, book }) {
  return (
    <Document title={book}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.wrapper}>
          {hymnals
            .filter((hymnal) => hymnal.book === book)
            .map((hymnal) => (
              <View key={hymnal.index} style={styles.section} wrap={false}>
                <Text style={styles.title}>
                  #{hymnal.number} {hymnal.name}
                </Text>
                <Text style={styles.hymnal}>
                  {hymnal?.text?.replaceAll('/n', '\n').replaceAll('_', '')}
                </Text>
              </View>
            ))}
        </View>

        <View fixed style={styles.footer}>
          <View>
            <SVGLogo width="90px" color="#74787b" />
          </View>
          <View style={{ textAlign: 'right' }}>
            <Text
              render={({ pageNumber, totalPages }) =>
                `${book} - ${pageNumber}/${totalPages}`
              }
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}
