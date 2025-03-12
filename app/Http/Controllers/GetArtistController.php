<?php

namespace App\Http\Controllers;

use Http;
use Illuminate\Http\Request;

class GetArtistController extends Controller
{
    public function fetchBands(Request $request)
    {
        $query = $request->query('q');
        if (!$query) {
            return response()->json([]);
        }

        $apiKey = env('LASTFM_API_KEY');
        $response = Http::get('http://ws.audioscrobbler.com/2.0/', [
            'method' => 'artist.search',
            'artist' => $query,
            'api_key' => $apiKey,
            'format' => 'json',
            'limit' => 10
        ]);

        $data = $response->json();
        $artists = $data['results']['artistmatches']['artist'] ?? [];

        $formattedArtists = collect($artists)
            ->filter(function ($artist) {
                return isset($artist['name']) && !empty($artist['name']);
            })
            ->unique('name')
            ->map(function ($artist) {
                return [
                    'label' => $artist['name'],
                    'value' => $artist['name'],
                    // 'listeners' => $artist['listeners'] ?? '0',
                ];
            })
            ->values()
            ->all();

        return response()->json($formattedArtists);
    }
}
