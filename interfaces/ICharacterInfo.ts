import IShortCharacterInfo from './IShortCharacterInfo';

type TItems = {
  items: [{ name: string }];
};

export default interface ICharacterInfo extends IShortCharacterInfo {
  comics: TItems;
  series: TItems;
  stories: TItems;
  events: TItems;
}
