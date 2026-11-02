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

- Keep the current journey in a React context provider mounted above the routes, never in module-global mutable state or browser storage, so files survive navigation but remain isolated per app instance and clear on refresh or reset.
- Keep the editable appeal state in the appeal page, with its current text retained by the journey provider on edits; browser-only text delivery belongs in a dedicated utility so editing and export need no uploads or server processing.
