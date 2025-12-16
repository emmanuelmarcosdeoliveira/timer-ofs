import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logoImg from '../../assets/logo-ofs.svg'
import { HeaderContainer } from './styles'
const Header = () => {
  return (
    <>
      <HeaderContainer>
        <div>
          <img width={42} src={logoImg} alt="logo OFS" />
        </div>
        <nav>
          <NavLink to="/" title="Timer">
            <Timer size={24} />
          </NavLink>
          <NavLink to="/history" title="Histórico">
            <Scroll size={24} />
          </NavLink>
        </nav>
      </HeaderContainer>
    </>
  )
}

export default Header
