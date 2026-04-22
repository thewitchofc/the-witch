import { forwardRef, useCallback } from 'react'
import type { LinkProps, NavLinkProps } from 'react-router-dom'
import { matchPath, useHref, useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { usePageTransition } from '../context/PageTransitionContext'

function samePathAndSearch(
  a: { pathname: string; search: string },
  b: { pathname: string; search: string },
): boolean {
  return a.pathname === b.pathname && a.search === b.search
}

/** קישור פנימי עם fade לפני ניווט (React Router) */
export const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(function CustomLink(
  { onClick, to, replace, state, reloadDocument, preventScrollReset, relative, viewTransition, ...rest },
  ref,
) {
  const href = useHref(to, { relative })
  const location = useLocation()
  const resolved = useResolvedPath(to, { relative })
  const navigate = useNavigate()
  const { go } = usePageTransition()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)
      if (e.defaultPrevented) return
      if (reloadDocument) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (e.button !== 0) return

      if (samePathAndSearch(resolved, location)) {
        e.preventDefault()
        navigate(to, { replace, state, preventScrollReset, relative, viewTransition })
        return
      }

      e.preventDefault()
      go(to, { replace, state, preventScrollReset, relative, viewTransition })
    },
    [
      onClick,
      reloadDocument,
      resolved,
      location,
      navigate,
      go,
      to,
      replace,
      state,
      preventScrollReset,
      relative,
      viewTransition,
    ],
  )

  return <a ref={ref} href={href} onClick={handleClick} {...rest} />
})

function navIsActive(
  pathname: string,
  resolved: { pathname: string },
  end: boolean | undefined,
  caseSensitive: boolean | undefined,
): boolean {
  return (
    matchPath(
      { path: resolved.pathname, end: end ?? false, caseSensitive: caseSensitive ?? false },
      pathname,
    ) != null
  )
}

/** NavLink עם אותה לוגיקת מעבר כמו CustomLink */
export const CustomNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function CustomNavLink(
  {
    onClick,
    to,
    replace,
    state,
    reloadDocument,
    preventScrollReset,
    relative,
    viewTransition,
    className,
    style,
    children,
    end,
    caseSensitive,
    ...rest
  },
  ref,
) {
  const href = useHref(to, { relative })
  const location = useLocation()
  const resolved = useResolvedPath(to, { relative })
  const navigate = useNavigate()
  const { go } = usePageTransition()

  const isActive = navIsActive(location.pathname, resolved, end, caseSensitive)

  const resolvedClassName =
    typeof className === 'function' ? className({ isActive, isPending: false }) : className

  const resolvedStyle =
    typeof style === 'function' ? style({ isActive, isPending: false }) : style

  const resolvedChildren =
    typeof children === 'function' ? children({ isActive, isPending: false }) : children

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)
      if (e.defaultPrevented) return
      if (reloadDocument) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (e.button !== 0) return

      if (samePathAndSearch(resolved, location)) {
        e.preventDefault()
        navigate(to, { replace, state, preventScrollReset, relative, viewTransition })
        return
      }

      e.preventDefault()
      go(to, { replace, state, preventScrollReset, relative, viewTransition })
    },
    [
      onClick,
      reloadDocument,
      resolved,
      location,
      navigate,
      go,
      to,
      replace,
      state,
      preventScrollReset,
      relative,
      viewTransition,
    ],
  )

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      className={resolvedClassName}
      style={resolvedStyle}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {resolvedChildren}
    </a>
  )
})
