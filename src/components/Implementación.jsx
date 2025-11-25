import { useSongContext } from '../context/SongContext.jsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function Implementacion() {
    const {
    albums,
    filteredSongs,
    loading,
    error,
    selectedAlbumId,
    changeAlbumFilter,
    selectedSong,
    setSelectedSong,
    reload,
    selectSong,
    } = useSongContext();

    const albumOptions = [
    { label: 'Todos los álbumes', value: 'ALL' },
    ...albums.map((album) => ({
        label: album.title,
        value: album.album_id,
    })),
    ];

    const header = (
    <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between w-100">
        <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center">
        <span className="fw-semibold me-md-2 text-light">Filtrar por álbum:</span>
        <Dropdown
            value={selectedAlbumId}
            options={albumOptions}
            onChange={(e) => changeAlbumFilter(e.value)}
            placeholder="Selecciona un álbum"
            className="w-100 w-md-25"
        />
        </div>

        <Button
        label="Recargar datos"
        icon="pi pi-refresh"
        className="p-button-rounded p-button-outlined ts-btn-reload"
        onClick={reload}
        />
    </div>
    );

    const footer = (
    <div className="d-flex justify-content-end small text-light">
        {filteredSongs?.length ?? 0} canciones encontradas
    </div>
    );

    return (
    <section className="implementacion-card shadow-soft">
        <h1 className="h3 fw-bold mb-3">Cancionero Swiftie</h1>
        <p className="mb-3">
        A continuación se muestra la discografía de Taylor Swift obtenida desde la API externa,
        ordenada cronológicamente según la fecha de lanzamiento del álbum. Puedes filtrar las
        canciones por álbum, y al hacer clic en una fila verás la letra y los detalles de la canción.
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <DataTable
        value={filteredSongs}
        dataKey="song_id"
        paginator
        rows={10}
        loading={loading}
        className="ts-datatable mt-3"
        header={header}
        footer={footer}
        rowHover
        responsiveLayout="scroll"
        onRowClick={(e) => selectSong(e.data)}
        >
        <Column field="title" header="Canción" sortable />
        <Column field="albumTitle" header="Álbum" sortable />
        <Column field="releaseDate" header="Fecha lanzamiento" sortable />
        <Column field="song_id" header="ID" />
        </DataTable>

        <Dialog
        visible={!!selectedSong}
        onHide={() => setSelectedSong(null)}
        header={selectedSong?.title ?? 'Detalle de canción'}
        className="ts-dialog"
        style={{ width: '90vw', maxWidth: '1000px' }}
        modal
        >
        {selectedSong && (
            <div className="row g-4 song-dialog-content">
            <div className="col-md-7">
                <h5 className="fw-semibold mb-2">Letra</h5>
                <div className="lyrics-box">
                {/* La API ya entrega la letra con saltos de línea */}
                <pre className="lyrics-pre">{selectedSong.lyrics}</pre>
                </div>
            </div>
            <div className="col-md-5">
                <h5 className="fw-semibold mb-2">Detalles</h5>
                <ul className="list-unstyled mb-3">
                <li>
                    <strong>Álbum:</strong> {selectedSong.albumTitle}
                </li>
                <li>
                    <strong>Fecha de lanzamiento:</strong> {selectedSong.releaseDate}
                </li>
                <li>
                    <strong>ID canción:</strong> {selectedSong.song_id}
                </li>
                </ul>
                <p className="small">
                Información obtenida en tiempo real desde la Taylor Swift API 🚀
                </p>
            </div>
            </div>
        )}
        </Dialog>
    </section>
    );
}

export default Implementacion;
