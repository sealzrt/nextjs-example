import Link from 'next/link'

const linkStyle = {
    marginRight: 15
};

/**
 * 不需要将组件放在特殊目录中 如： components 目录下
 * 唯一的特殊目录是pages目录
 * @returns {*}
 * @constructor
 */
const Header = () => (
    <div>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
    </div>
)

export default Header