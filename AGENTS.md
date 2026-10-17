<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use TanStack file routes for all content pages; lodging and tour parents only render Outlet so detail pages remain independently addressable.
- Keep travel content and image imports in a shared browser-safe data module so listings, detail pages and metadata agree.
- Use shared travel presentation components and semantic styles for the Spanish editorial experience; animations respect reduced-motion preferences.
- Reservation interaction currently prepares a downloadable inquiry only; never imply sending, confirmed availability or payment without connected services and verified business data.
