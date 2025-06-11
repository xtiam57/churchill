import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Sidebar, Title, Wrapper } from 'components';
import { useHymnal } from 'hooks';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { PDFDocument } from './PDFDocument';

export default function ExportPage() {
  const { hymnal, books } = useHymnal();
  const [book, setBook] = useState('Apéndice');

  const handleBookChange = ({ target }) => {
    const { value } = target;
    setBook(value);
  };

  return (
    <Wrapper>
      <Sidebar>
        <Title>Exportar</Title>

        <Form.Control
          size="lg"
          as="select"
          value={book}
          onChange={handleBookChange}
        >
          <option value="ALL">Todos los himnarios</option>
          {books.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </Form.Control>

        {hymnal.length && (
          <PDFDownloadLink
            document={<PDFDocument hymnals={hymnal} book={book} />}
            fileName={`${book}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
        )}
      </Sidebar>

      <PDFViewer className="w-100 border-0">
        <PDFDocument hymnals={hymnal} book={book} />
      </PDFViewer>
    </Wrapper>
  );
}

// import { Sidebar, Title, Wrapper } from 'components';
// import { useState } from 'react';
// import { Form } from 'react-bootstrap';
// import { PDF_HYMNALS } from 'values';

// export default function ExportPage() {
//   const [book, setBook] = useState(PDF_HYMNALS[0].url);

//   const handleBookChange = ({ target }) => {
//     const { value } = target;
//     console.log('target', value);
//     setBook(value);
//   };

//   return (
//     <Wrapper>
//       <Sidebar>
//         <Title>Exportar</Title>

//         <Form.Control
//           size="lg"
//           as="select"
//           value={book.url}
//           onChange={handleBookChange}
//         >
//           {PDF_HYMNALS.map((book) => (
//             <option key={book.label} value={book.url}>
//               {book.label}
//             </option>
//           ))}
//         </Form.Control>

//         {/* {hymnals.length && (
//           <PDFDownloadLink
//             document={<PDFDocument hymnals={hymnals} book={book} />}
//             fileName={`${book}.pdf`}
//           >
//             {({ blob, url, loading, error }) =>
//               loading ? 'Loading document...' : 'Download now!'
//             }
//           </PDFDownloadLink>
//         )} */}
//       </Sidebar>

//       <iframe className="w-100 border-0" title={'o'} src={book} />

//       {/* <PDFViewer className="w-100 border-0">
//         <PDFDocument hymnals={hymnals} book={book} />
//       </PDFViewer> */}
//     </Wrapper>
//   );
// }
