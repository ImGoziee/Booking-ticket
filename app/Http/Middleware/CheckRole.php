<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user || !$user->role) {
            return redirect()->route('home');
        }

        if (!in_array($user->role, $roles)) {
            if ($request->routeIs('admin.*')) {
                return redirect()->route('home');
            }
            return redirect()->route('admin.dashboard');
        }
        return $next($request);
    }
}
