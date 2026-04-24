import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { Book, Clock, Gift, Loader2Icon, LoaderCircle, PlayCircle, Settings, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CourseInfo({ course, viewCourse }) {
    const courseLayout = course?.courseJson?.course;
    //total topics
    const totalTopics = courseLayout?.chapters?.reduce(
  (sum, chapter) => sum + (chapter?.topics?.length || 0),
  0
);

const parseDurationToMinutes = (duration) => {
  if (!duration) return 0;

  const str = duration.toString().toLowerCase().trim();

  let total = 0;

  // Extract hours (e.g. "2 hr", "1.5 hours")
  const hourMatch = str.match(/(\d+(\.\d+)?)\s*h/);
  if (hourMatch) {
    total += parseFloat(hourMatch[1]) * 60;
  }

  // Extract minutes (e.g. "30 min")
  const minMatch = str.match(/(\d+)\s*m/);
  if (minMatch) {
    total += parseInt(minMatch[1]);
  }

  // If only number (like "45"), assume minutes
  if (!hourMatch && !minMatch) {
    total += parseInt(str) || 0;
  }

  return Math.round(total);
};

const totalMinutes = courseLayout?.chapters?.reduce((sum, chapter) => {
  return sum + parseDurationToMinutes(chapter?.duration);
}, 0);

// Convert to readable format
let formattedDuration;

if (totalMinutes < 60) {
  formattedDuration = `${totalMinutes} min`;
} else {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  formattedDuration = minutes === 0
    ? `${hours} hr`
    : `${hours} hr ${minutes} min`;
}



    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const GenerateCourseContent = async () => {

        setLoading(true)
        try {
            const result = await axios.post('/api/generate-course-content', {
                courseJson: courseLayout,
                courseTitle: course?.name,
                courseId: course?.cid
            });
            console.log(result.data);
            setLoading(false);
            router.replace('/workspace')
            toast.success('Course Generated successfully')
        }
        catch (e) {
            console.log(e);
            setLoading(false);
            toast.error("Server Side error, Try Again!")
        }

    }
    return (
        <div>
            <div className='  lg:flex gap-5 justify-between p-5 rounded-2xl shadow'>
                <div className='flex flex-col gap-3 w-full'>
                    {course ? <div>
                        <h2 className='font-bold text-3xl'>{courseLayout?.name}</h2>
                        <p className='line-clamp-2 text-gray-500'>{courseLayout?.description}</p>
                    </div> :
                        <div>
                            <Skeleton className="w-full h-[20px] " />
                            <Skeleton className="max-w-sm h-[20px] mt-3 " />

                        </div>}

                    {course ? <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                        <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                            <Clock className='text-blue-500' />
                            <section>
                                <h2 className='font-bold'>Duration</h2>
                                <h2>{formattedDuration} </h2>
                            </section>
                        </div>
                        <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                            <Book className='text-green-500' />
                            <section>
                                <h2 className='font-bold'>Topics</h2>
                                <h2>{totalTopics}</h2>
                            </section>
                        </div>
                        <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                            <TrendingUp className='text-red-500' />
                            <section>
                                <h2 className='font-bold'>Difficulty Level</h2>
                                <h2>{course?.level}</h2>
                            </section>
                        </div>
                    </div> :
                        <div>
                            <Skeleton className={'w-full h-[70px] rounded-2xl mt-3'} />
                        </div>}

                    {!viewCourse ?
                        <Button className={'w-full'} onClick={GenerateCourseContent}
                            disabled={loading}>
                            {loading ? <Loader2Icon className='animate-spin' /> : <Settings />}
                            Generate Content</Button>
                        : <Link href={'/course/' + course?.cid}>
                            <Button> <PlayCircle /> Continue Learning </Button>
                        </Link>}
                </div>
                {course?.bannerImageUrl ? <Image src={course?.bannerImageUrl} alt={'banner Image'}
                    width={400}
                    height={400}
                    className='w-full mt-5 md:mt-0 object-cover  max-w-lg h-[240px] rounded-2xl '
                /> :
                    <div className='h-[240px] max-w-md w-full bg-slate-100 rounded-xl animate-pulse'>
                    </div>}
            </div>
            {/*  */}
        </div>
    )
}

export default CourseInfo