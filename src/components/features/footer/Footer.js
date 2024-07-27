import { pffList } from '../../assets/data/PFFList';
import { pfList } from '../../assets/data/PFList';
import FinalF from './FinalF';
import PFInfo from './PFInfo';
import PInfo from './PInfo';

function Footer() {
  return (
    <>
      <div className="flex flex-col gap-3 p-4 bg-gray-100">
        {pfList.map((item, index) => (
          <PInfo item={item} key={index} />
        ))}
      </div>
      <div className="bg-gray-200 flex p-4 gap-4 flex-wrap">
        {pffList.map((item, index) => (
          <PFInfo item={item} key={index} />
        ))}
      </div>
      <FinalF />
    </>
  );
}

export default Footer;
