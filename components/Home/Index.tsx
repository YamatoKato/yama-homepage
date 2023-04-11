import React from 'react';
import Image from 'next/image';
import { HiBuildingOffice } from 'react-icons/hi2';
import { Gi3DMeeple } from 'react-icons/gi';
import { AiFillFire } from 'react-icons/ai';
import { GoTools } from 'react-icons/go';
import { ImBook } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { MdOutlineExpandMore } from 'react-icons/md';
import { siteConfig } from '@/site.config';

export const HomeContent = () => {
  return (
    <div className='md:flex justify-between'>
      <div className=' md:mr-7 w-auto'>
        <Image
          className='rounded-full'
          src='/cover-image.jpg'
          width={400}
          height={400}
          alt='cover'
        />
        <div className='pr-5 pt-2 w-96 text-center'>
          <h1 className='font-bold text-xl2'>
            Yamato&nbsp;Kato&nbsp;&nbsp;
            <a
              href={siteConfig.twitterUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <BsTwitter />
            </a>
            &nbsp;
            <a
              href={siteConfig.instagramUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <BsInstagram />
            </a>
            &nbsp;
            <a
              href={siteConfig.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <BsGithub />
            </a>
          </h1>
          <ul>
            <li>2002/10/04(20)</li>
            <li>Tokyo,Japan</li>
          </ul>
          <p>
            夜更かし確定な欧州サッカーをリアタイするために、眠れない週末を過ごしている大学生
            <br />
            最近は、梅酒と柚子胡椒にハマり中...
          </p>
        </div>
      </div>
      <div className=' flex-column w-auto divide-y divide-dashed divide-gray-800'>
        <div className='mb-2 mt-2'>
          <h1 className='font-extralight'>
            Belonging&nbsp;
            <HiBuildingOffice />
          </h1>
          <ul>
            <li>東京電機大学&nbsp;/&nbsp;システムデザイン工学部(B3)</li>
            <li>Wizleap,Inc.&nbsp;/&nbsp;エンジニア(アルバイト)</li>
          </ul>
        </div>
        <div className='mb-2 mt-2'>
          <h1 className='font-extralight'>
            Hobby&nbsp;
            <Gi3DMeeple />
          </h1>
          <ul>
            <li>
              欧州サッカー(Liverpool)&nbsp;/&nbsp;柴犬&nbsp;/&nbsp;漫画&nbsp;/&nbsp;MTGA
            </li>
          </ul>
        </div>
        <div className='mb-2 mt-2'>
          <h1 className='font-extralight'>
            Skills&nbsp;
            <GoTools />
          </h1>
          <ul>
            <li>
              PHP&nbsp;/&nbsp;Laravel&nbsp;/&nbsp;JavaScript&nbsp;/&nbsp;Typecript
            </li>
          </ul>
        </div>
        <div className='mb-2 mt-2'>
          <h1 className='font-extralight'>
            Study&nbsp;
            <ImBook />
          </h1>
          <ul>
            <li>
              React&nbsp;/&nbsp;Next.js&nbsp;/&nbsp;Go言語&nbsp;/&nbsp;Solidity&nbsp;
            </li>
          </ul>
        </div>
        <div className='mb-2 mt-2'>
          <h1 className='font-extralight'>
            Interest&nbsp;
            <AiFillFire />
          </h1>
          <ul>
            <li>Webアプリ開発&nbsp;/&nbsp;ブロックチェーン技術&nbsp;</li>
          </ul>
        </div>
        <div className='mb-2 mt-2'>
          <h1 className='font-extralight'>
            More...&nbsp;
            <MdOutlineExpandMore />
          </h1>
          <ul>
            <li>
              <a
                className="after:content-['_↗']"
                href={siteConfig.canvaUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                私についてもっと詳しく(canvaスライド)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
