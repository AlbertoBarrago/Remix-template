import type {MetaFunction} from "@remix-run/node";
import {getDb} from "~/.server/mongodb";
import {useLoaderData, useNavigate} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        {title: "Notes App"},
        {name: "description", content: "Welcome to Notes App!"},
    ];
};

export async function loader() {
    const db = await getDb();
    const articles = await db.collection('articles').find().toArray();
    return {articles};
}

export default function Index() {
    const {articles} = useLoaderData<typeof loader>();
    const {navitagion} = useNavigate()
    return (
        <div className="font-sans p-4">
            <h1 className="text-3xl">Welcome to Notes</h1>
            <ul>
                {articles.map(article => (
                    <li key={article._id}>
                      {article.title} <br/>
                      {article.author}
                    </li>
                ))}
            </ul>
        </div>
    );
}
