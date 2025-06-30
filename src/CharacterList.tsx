import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import { characterListRoute } from './router';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface ApiResponse {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: Character[];
}

const fetchCharacters = async (page: number): Promise<ApiResponse> => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/character?page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

const columns: ColumnDef<Character>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'image', header: 'Image', cell: info => <img src={info.getValue() as string} alt="character" width={40} /> },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'species', header: 'Species' },
  { accessorKey: 'gender', header: 'Gender' },
];

export default function CharacterList() {
  const search = characterListRoute.useSearch() ?? {};
  const navigate = useNavigate();
  let page = Number((search as any).page) || 1;
  if (page < 1) page = 1;

  const { data, isFetching, refetch } = useQuery<ApiResponse, Error>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    placeholderData: (prev) => prev,
  });

  const maxPages = data?.info?.pages ?? 1;
  if (page > maxPages) page = maxPages;

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, maxPages));
    navigate({ search: { ...search, page: validPage } });
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => refetch()}
        disabled={isFetching}
        className="mb-4 px-4 py-2 rounded bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 transition disabled:opacity-50"
      >
        Refresh
      </button>
      <div className="overflow-x-auto rounded-xl shadow-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/30 dark:border-gray-700/40">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                onClick={() => navigate({ to: '/character/$id', params: { id: String(row.original.id) } })}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6 bg-white/40 dark:bg-gray-800/40 rounded-xl shadow backdrop-blur-md border border-white/30 dark:border-gray-700/40 py-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || isFetching || !data?.info?.prev}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {page} of {maxPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === maxPages || isFetching || !data?.info?.next}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
} 