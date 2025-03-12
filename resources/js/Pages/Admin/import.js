import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Admin/Header';
import TanStackTable from '@/Components/Datatables/TanStackTable';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export {
    AuthenticatedLayout,
    React,
    useState,
    Head,
    Header,
    TanStackTable,
    createColumnHelper,
    Pencil,
    Trash2
};