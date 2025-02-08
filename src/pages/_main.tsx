import { optionsTargy, optionsEv, optionsSzint, optionsIdoszak } from '../utils/options';
import { useEffect, useState } from "react";
import { fetchFile }  from '../utils/fetch';
import { Search } from 'lucide-react';
import { generateUrls } from '../utils/generateUrls';
import { CloudAlert } from 'lucide-react'
import ButtonComponent from "../components/Button";
import Confirmation from '../components/Confirmation';
import Header from '../components/Header';
import Combobox from '../components/Combobox'
import '../App.css';

const MainComponent = () => {
  const [targy, setTargy] = useState<string>("");
  const [ev, setEv] = useState<string>("");
  const [szint, setSzint] = useState<string>("");
  const [idoszak, setIdoszak] = useState<string>("");
  const [honap, setHonap] = useState<string>("");
  const [isTask, setIsTask] = useState<Boolean>(false);
  const [isGuide, setIsGuide] = useState<Boolean>(false);
  const [isAudio, setIsAudio] = useState<Boolean>(false);
  const [isZip, setIsZip] = useState<Boolean>(false);
  const [isZipUt, setIsZipUt] = useState<Boolean>(false);

  const urls = generateUrls(ev, idoszak, szint, targy, honap);
  const isDisabled = !targy || !ev || !idoszak || !szint;

  useEffect(() => {
    if (idoszak === "osz") {
      setHonap("okt");
    } else if (idoszak === "tavasz") {
      setHonap("maj");
    }
  }, [idoszak]);

  const handleSearch = async () => {
    const taskAvailable = await fetchFile(urls.task);
    const guideAvailable = await fetchFile(urls.guide);
    const audioAvailable = await fetchFile(urls.audio);
    const zipAvailable = await fetchFile(urls.zip);
    const zipUtAvailable = await fetchFile(urls.zipUt);
  
    setIsTask(taskAvailable);
    setIsGuide(guideAvailable);
    setIsAudio(audioAvailable);
    setIsZip(zipAvailable);
    setIsZipUt(zipUtAvailable);
  };
  
  return (
    <>
      <div className='h-auto w-screen md:h-[650px] md:w-[500px] rounded md:border-r md:border-l md:border-[#1f1f1f] overflow-hidden'>
      <div className='h-[80px] flex justify-center items-center rounded-t border-t border-b border-[#1f1f1f]'>
          <Header />
        </div>
        <div className='h-[490px] flex justify-center items-center gap-4 flex-col'>
          <Combobox title="Tárgy" errorMsg="A tárgy nem elérhető" options={optionsTargy} onValueChange={setTargy}/>
          <Combobox title="Év" errorMsg="Az év nem elérhető" options={optionsEv} onValueChange={setEv}/>
          <Combobox title="Időszak" errorMsg="Az időszak nem elérhető" options={optionsIdoszak} onValueChange={setIdoszak}/>
          <Combobox title="Szint" errorMsg="A szint nem elérhető" options={optionsSzint} onValueChange={setSzint}/>
          <div className='mt-6'>
            <ButtonComponent onClick={handleSearch} title="Keresés" disabled={isDisabled} icon={<Search className="mr-2 size-5"/>}/>
          </div>
        </div>
         <div className="sm:h-auto lg:h-[80px] p-4 rounded-b border-b border-t border-[#1f1f1f] flex justify-center items-center gap-3 flex-wrap">
            {isTask && urls?.task ? (
              <ButtonComponent title="Feladat" onClick={() => window.open(urls.task as string)} disabled={isDisabled} />
            ) : (
            <>
            <CloudAlert color='#dc2626' />
            <span className='font-normal bg-gradient-to-r bg-clip-text text-transparent from-red-600 via-red-500 to-red-400 animate-text'>Jelenleg nincs elérhető link</span>
            </>
            )}
            {isGuide && urls?.guide && (
              <ButtonComponent title="Útmutató" onClick={() => window.open(urls.guide as string)} disabled={isDisabled} />
            )}
            {isAudio && urls?.audio && (
              <ButtonComponent title="Hanganyag" onClick={() => window.open(urls.audio as string)} disabled={isDisabled} />
            )}
            {isZip && urls?.zip && (
            <Confirmation title="Forrás" onClick={() => window.open(urls.zip as string)} disabled={isDisabled} fileName={urls.zip}/> 
            )}
            {isZipUt && urls?.zipUt && (
            <Confirmation title="Megoldás" onClick={() => window.open(urls.zipUt as string)} disabled={isDisabled} fileName={urls.zipUt}/> 
            )}
        </div>
      </div>
    </>
  );
};

export default MainComponent;
