import {
  AutoStories,
  FolderCopy,
  Image as ImageIcon,
  Refresh,
  SmartDisplay,
} from '@mui/icons-material';
import { List } from 'components';
import { useScriptures } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Modal,
  OverlayTrigger,
  Tab,
  Tabs,
  Tooltip,
} from 'react-bootstrap';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';

function countBy(items, key) {
  const counts = {};

  items.forEach((item) => {
    counts[item[key]] = (counts[item[key]] || 0) + 1;
  });

  return counts;
}

function AlreadyAddedBadge({ count }) {
  if (!count) {
    return null;
  }

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>Ya está en la lista{count > 1 ? ` (x${count})` : ''}</Tooltip>
      }
    >
      <span
        className="d-flex align-items-center text-success"
        style={{ gap: 4 }}
      >
        {/* <CheckCircle fontSize="small" /> */}
        {count > 1 && (
          <Badge variant="secondary" pill>
            {count}
          </Badge>
        )}
      </span>
    </OverlayTrigger>
  );
}

const verseRender = (option, { text }) => (
  <>
    <Highlighter search={text}>{option.subtext}</Highlighter>
    <small className="d-block font-italic text-muted">
      {option.text.replaceAll('<br/>', ' ').replaceAll('_', '')}
    </small>
  </>
);

export function AddResourceModal({ show, onHide, onAdd, existingItems = [] }) {
  const { scriptures } = useScriptures();
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const videoCounts = useMemo(
    () =>
      countBy(
        existingItems.filter((item) => item.type === 'video'),
        'path',
      ),
    [existingItems],
  );

  const imageCounts = useMemo(
    () =>
      countBy(
        existingItems.filter((item) => item.type === 'image'),
        'bg',
      ),
    [existingItems],
  );

  const loadVideos = useCallback(() => {
    setIsLoadingVideos(true);

    window.electronAPI?.getVideos().then((data) => {
      setVideos(data || []);
      setIsLoadingVideos(false);
    });
  }, []);

  const loadImages = useCallback(() => {
    setIsLoadingImages(true);

    window.electronAPI?.getResources().then((data) => {
      setImages(data || []);
      setIsLoadingImages(false);
    });
  }, []);

  useEffect(() => {
    if (!show) {
      return;
    }

    loadVideos();
    loadImages();
  }, [show, loadVideos, loadImages]);

  const handleOpenVideosFolder = async () => {
    const paths = await window.electronAPI.getPaths();
    window.electronAPI?.openDirectory(paths.VIDEOS_PATH);
  };

  const handleOpenImagesFolder = async () => {
    const paths = await window.electronAPI.getPaths();
    window.electronAPI?.openDirectory(paths.RESOURCES_PATH);
  };

  const handleAddVerse = (selected) => {
    const [verse] = selected;

    if (!verse) {
      return;
    }

    onAdd({
      type: 'verse',
      title: verse.subtext,
      description: verse.text.replaceAll('<br/>', ' ').replaceAll('_', ''),
      text: verse.text,
      subtext: verse.subtext,
      processedText: verse.processedText,
    });
  };

  const handleAddVideo = (video) => {
    onAdd({
      type: 'video',
      title: video.title,
      description: video.createdAt,
      isVideo: true,
      path: video.path,
    });
  };

  const handleAddImage = (image) => {
    onAdd({
      type: 'image',
      title: image.title,
      description: image.createdAt,
      bg: image.bg,
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar recurso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs defaultActiveKey="verse" id="add-resource-tabs" className="mb-3">
          <Tab
            eventKey="verse"
            title={
              <>
                <AutoStories fontSize="small" /> Versículo
              </>
            }
          >
            <Typeahead
              id="add-verse-typeahead"
              size="large"
              emptyLabel="No hay resultados."
              labelKey="text"
              minLength={0}
              paginate
              paginationText="Ver más resultados..."
              placeholder="Buscar una palabra..."
              options={scriptures}
              onChange={handleAddVerse}
              highlightOnlyResult
              ignoreDiacritics
              renderMenuItemChildren={verseRender}
            />
          </Tab>

          <Tab
            eventKey="video"
            title={
              <>
                <SmartDisplay fontSize="small" /> Video
              </>
            }
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex" style={{ gap: '.5rem' }}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleOpenVideosFolder}
                >
                  <FolderCopy fontSize="small" /> Abrir carpeta
                </Button>

                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Recargar videos</Tooltip>}
                >
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={loadVideos}
                  >
                    <Refresh fontSize="small" />
                  </Button>
                </OverlayTrigger>
              </div>

              <small className="text-muted">
                {videos.length} video{videos.length === 1 ? '' : 's'}
              </small>
            </div>

            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {isLoadingVideos ? (
                <small className="text-muted">Cargando videos...</small>
              ) : videos.length ? (
                videos.map((video) => (
                  <List.Image
                    key={video.id}
                    light
                    title={video.title}
                    description={video.createdAt}
                    icon={<SmartDisplay />}
                    onClick={() => handleAddVideo(video)}
                    badge={
                      <AlreadyAddedBadge count={videoCounts[video.path]} />
                    }
                  />
                ))
              ) : (
                <small className="text-muted">No hay videos disponibles.</small>
              )}
            </div>
          </Tab>

          <Tab
            eventKey="image"
            title={
              <>
                <ImageIcon fontSize="small" /> Imagen
              </>
            }
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex" style={{ gap: '.5rem' }}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleOpenImagesFolder}
                >
                  <FolderCopy fontSize="small" /> Abrir carpeta
                </Button>

                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Recargar imágenes</Tooltip>}
                >
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={loadImages}
                  >
                    <Refresh fontSize="small" />
                  </Button>
                </OverlayTrigger>
              </div>

              <small className="text-muted">
                {images.length} im{images.length === 1 ? 'a' : 'á'}gen
                {images.length === 1 ? '' : 'es'}
              </small>
            </div>

            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {isLoadingImages ? (
                <small className="text-muted">Cargando imágenes...</small>
              ) : images.length ? (
                images.map((image) => (
                  <List.Image
                    key={image.id}
                    light
                    title={image.title}
                    description={image.createdAt}
                    src={image.bg}
                    onClick={() => handleAddImage(image)}
                    badge={<AlreadyAddedBadge count={imageCounts[image.bg]} />}
                  />
                ))
              ) : (
                <small className="text-muted">
                  No hay imágenes disponibles.
                </small>
              )}
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
