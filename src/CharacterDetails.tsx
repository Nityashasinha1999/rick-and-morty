import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

const fetchCharacter = async (id: string): Promise<Character> => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/character/${id}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export default function CharacterDetails() {
  // @ts-ignore
  const { id } = useParams({ strict: false });
  const { data, isLoading, error } = useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center text-lg py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">Error: {error.message}</div>;
  if (!data) return <div className="text-center text-gray-500 py-8">No character found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-2xl p-6 flex flex-col items-center backdrop-blur-md border border-white/30 dark:border-gray-700/40">
      <button
        onClick={() => window.history.back()}
        className="self-start mb-4 px-3 py-1 rounded bg-gray-200/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-200 hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition backdrop-blur-md"
      >
        &larr; Back
      </button>
      <img src={data.image} alt={data.name} width={200} className="rounded shadow mb-4 border-4 border-gray-200/60 dark:border-gray-700/60" />
      <h2 className="text-2xl font-bold mb-2 text-center drop-shadow-lg">{data.name}</h2>
      <ul className="w-full text-lg space-y-1">
        <li><span className="font-semibold">Status:</span> {data.status}</li>
        <li><span className="font-semibold">Species:</span> {data.species}</li>
        <li><span className="font-semibold">Gender:</span> {data.gender}</li>
        <li><span className="font-semibold">Origin:</span> {data.origin.name}</li>
        <li><span className="font-semibold">Location:</span> {data.location.name}</li>
      </ul>
    </div>
  );
} 