import { PrettyHeader } from "@/components/ui/pretty-header"

function JobHeading({title, children}: {title: string, children: React.ReactNode}) {
    return (
        <div className="my-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            { children }
        </div>
    )
}

export default async function CareersPage() {

    return (
        <main className="flex flex-col p-4 w-full sm:w-1/2 sm:mx-auto">
        <PrettyHeader className="text-3xl sm:text-4xl mb-3">
            Come work with us at Huddlechat!
        </PrettyHeader>
        <p className="my-3">Please send us a resume and CV along with the job title you are applying to <a className="text-sky-400 underline" href="mailto:ben@huddlevision.ai">here</a> if interested.</p>
        <JobHeading title="Senior Full-Stack Developer (Huddlechat)">
            <p className="text-zinc-500 my-3">We are looking for a software engineer to help us build the next generation of sports analytics software.</p>
            <ul>
                <li>Experience with React, Node.js, NextJS, and Vercel</li>
                <li>Experience with Clickhouse and OLAP</li>
                <li>Experience with a major cloud provider (Google Cloud a plus)</li>
                <li>Experience with Python and Flask</li>
                <li>MLops Profficiency a plus - quantization, deployment, and monitoring</li>
                <li>Experience within sports analytics a plus</li>
            </ul>
        </JobHeading>
        <JobHeading title="Computer Vision Engineer (Huddlevision)">
            <p className="text-zinc-500 my-3">We are looking for a talented Computer Vision Engineer to join our team at Huddlevision and help us build the next generation of sports analytics software. Your expertise will be pivotal in revolutionizing how sports data is analyzed and utilized.</p>
            <ul>
                <li>Strong proficiency in Python and PyTorch</li>
                <li>Extensive experience in developing and deploying computer vision models</li>
                <li>Knowledge of advanced computer vision techniques, including object detection, tracking, and pose estimation</li>
                <li>Experience in sports analytics or a strong interest in applying computer vision to sports</li>
                <li>Proven ability to deploy machine learning models in production environments</li>
                <li>Familiarity with MLOps practices, including model quantization, optimization, and monitoring</li>
                <li>Experience with Flask or other web frameworks for building APIs is a plus</li>
                <li>Experience with cloud services (e.g., Google Cloud, AWS, Azure) is a plus</li>
            </ul>
        </JobHeading>
        </main>
    )
}