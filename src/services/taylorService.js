const BASE_URL = 'https://taylor-swift-api.sarbo.workers.dev';

async function handleResponse(response) {
    if (!response.ok) {
    throw new Error(`Error al consumir la API: ${response.status}`);
    }
    return response.json();
}

export async function fetchAlbums() {
    const res = await fetch(`${BASE_URL}/albums`);
    return handleResponse(res);
}

export async function fetchAllSongs() {
    const res = await fetch(`${BASE_URL}/songs`);
    return handleResponse(res);
}

export async function fetchSongInfo(songId) {
    const res = await fetch(`${BASE_URL}/songs/${songId}`);
    return handleResponse(res);
}

export async function fetchLyrics(songId) {
    const res = await fetch(`${BASE_URL}/lyrics/${songId}`);
    return handleResponse(res);
}

/**
 * Devuelve información detallada de una canción + letra
 */
export async function fetchSongDetails(songId) {
    const [info, lyrics] = await Promise.all([
    fetchSongInfo(songId),
    fetchLyrics(songId),
    ]);

    return {
    song_id: info.song_id,
    album_id: info.album_id,
    songTitle: info.song_title,
    lyrics: lyrics.lyrics,
    };
}
