import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
    fetchAlbums,
    fetchAllSongs,
    fetchSongDetails,
} from '../services/taylorService';

const SongContext = createContext();

export function SongProvider({ children }) {
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);          // canciones enriquecidas
    const [selectedAlbumId, setSelectedAlbumId] = useState('ALL');
    const [selectedSong, setSelectedSong] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
    try {
        setLoading(true);
        setError(null);

        const [albumsData, songsData] = await Promise.all([
        fetchAlbums(),
        fetchAllSongs(),
        ]);

      // ordenar álbumes cronológicamente
        const sortedAlbums = [...albumsData].sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );

        const albumMap = sortedAlbums.reduce((acc, album) => {
        acc[album.album_id] = album;
        return acc;
        }, {});

      // enriquecer canciones con info del álbum y ordenar por fecha
        const cleanText = (str) =>
        str?.replace(/\\'/g, "'") // reemplaza \' por '
            ?.replace(/\\"/g, '"'); // si algún día aparece texto con \"

        const songsWithMeta = songsData
        .map((song) => ({
            ...song,
            title: cleanText(song.title),
            albumTitle: cleanText(albumMap[song.album_id]?.title ?? 'Álbum desconocido'),
            releaseDate: albumMap[song.album_id]?.release_date ?? null,
        }))
        .sort((a, b) => {
            if (a.releaseDate && b.releaseDate) {
            const diff = new Date(a.releaseDate) - new Date(b.releaseDate);
            if (diff !== 0) return diff;
            }
            return a.title.localeCompare(b.title);
        });

        setAlbums(sortedAlbums);
        setSongs(songsWithMeta);
    } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los datos del Cancionero Swiftie.');
    } finally {
        setLoading(false);
    }
    }, []);

    useEffect(() => {
    loadData();
    }, [loadData]);

    const filteredSongs =
    selectedAlbumId === 'ALL'
        ? songs
        : songs.filter((song) => song.album_id === selectedAlbumId);

    const changeAlbumFilter = (albumId) => {
    setSelectedAlbumId(albumId);
    };

    const selectSong = async (song) => {
    try {
        setLoading(true);
        const detailed = await fetchSongDetails(song.song_id);
        setSelectedSong({
        ...song,
        title: detailed.songTitle || song.title,
        lyrics: detailed.lyrics,
        });
    } catch (err) {
        console.error(err);
        setError('No se pudo obtener el detalle de la canción.');
    } finally {
        setLoading(false);
    }
    };

    const value = {
    albums,
    songs,
    filteredSongs,
    loading,
    error,
    selectedAlbumId,
    changeAlbumFilter,
    selectedSong,
    setSelectedSong,
    reload: loadData,
    selectSong,
    };

    return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}

export const useSongContext = () => useContext(SongContext);
