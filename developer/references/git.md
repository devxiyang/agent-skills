# git — Version Control

> 🚨 **CRITICAL — MUST confirm with user before running:** `git push --force`, `git reset --hard`, `git branch -D`, `git clean -f`, rebase on shared branches. These are **irreversible** and may affect collaborators.

## Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Daily workflow

```bash
git status                           # what changed
git diff                             # unstaged changes
git diff --staged                    # staged changes

git add file.txt                     # stage a file
git add -p                           # stage interactively (hunk by hunk)
git commit -m "feat: add login"
git push
git pull --rebase                    # pull and rebase local commits on top
```

## Branches

```bash
git branch                           # list branches
git switch -c feature/my-feature     # create and switch
git switch main                      # switch branch
git merge feature/my-feature         # merge into current
git branch -d feature/my-feature     # delete merged branch
git branch -D feature/my-feature     # force delete
```

## Stash

```bash
git stash                            # save uncommitted changes
git stash pop                        # restore and remove stash
git stash list                       # list stashes
git stash drop stash@{0}             # delete a stash
```

## History

```bash
git log --oneline -20                # compact log
git log --oneline --graph --all      # visual branch graph
git show <commit>                    # show a commit
git blame file.txt                   # who changed each line
```

## Undo

```bash
git restore file.txt                 # discard unstaged changes
git restore --staged file.txt        # unstage a file
git revert <commit>                  # safe undo (creates new commit)
git reset --soft HEAD~1              # undo last commit, keep changes staged
```

## Remote

```bash
git remote -v                        # list remotes
git remote add origin <url>
git fetch origin
git push -u origin main              # set upstream and push
git push origin --delete my-branch   # delete remote branch
```

## Tags

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "Release 1.0"
git push origin v1.0.0
git push origin --tags
```

## Useful shortcuts

```bash
git commit --amend                   # edit last commit message
git cherry-pick <commit>             # apply a specific commit
git diff main...feature              # changes since branching from main
git shortlog -sn                     # commit count by author
```
