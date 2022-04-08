import axios from 'axios';
import ICharacterInfo from '../interfaces/ICharacterInfo';
import IPageInfo from '../interfaces/IPageInfo';

type TPageInfo = IPageInfo & { results: ICharacterInfo[] };

export default async function fetchCharacter(
  id: number | string | string[] | undefined,
): Promise<TPageInfo> {
  const res = await axios.get(`/characters/${id}`);
  return res.data.data;
}
