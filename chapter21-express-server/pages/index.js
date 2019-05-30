import React from 'react'
import Link from 'next/link'

export default () => (
    <ul>
        <li><Link href='/b?id=123' as='/a/123'><a>a</a></Link></li>
        <li><Link href='/a?id=456' as='/b/456'><a>b</a></Link></li>
        <li>
            <Link
                href={{pathname: '/posts', query: { id: '2' }}}
                as='/posts/2'
            >
                <a>post #2</a>
            </Link>
        </li>
    </ul>
)