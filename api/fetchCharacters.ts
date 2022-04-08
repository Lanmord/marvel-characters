import axios from 'axios';
import IPageInfo from '../interfaces/IPageInfo';
import IShortCharacterInfo from '../interfaces/IShortCharacterInfo';

type TPageInfo = IPageInfo & { results: IShortCharacterInfo[] };

export default async function fetchCharacters(
  limit: number,
  offset: number,
  searchQuery?: string,
): Promise<TPageInfo> {
  const res = await axios.get('/characters', {
    params: {
      limit,
      offset,
      nameStartsWith: !!searchQuery ? searchQuery : undefined,
    },
  });

  return res.data.data;
}
