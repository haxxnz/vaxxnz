import { FunctionComponent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/** A link that retains the users search query (i.e. lat long) */
export const PageLink: FunctionComponent<{ to: string; role?: string }> = ({
    to,
    children,
    role,
    ...props
}) => {
    const { query } = useRouter();
    return (
        <Link href={{ pathname: to, query: query }}>
            <a role={role}>{children}</a>
        </Link>
    );
};
