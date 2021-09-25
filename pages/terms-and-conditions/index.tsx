import * as React from "react";
import ReactMarkdown from "react-markdown";
import { terms } from "../../src/md/LegalContent";

export default function Page() {
    return (
        <div className={"big-old-container"}>
            <ReactMarkdown>{terms}</ReactMarkdown>
        </div>
    );
}
