# Presentation Script: 3 Technologies I Learned This Semester

## Goal
Tell the audience what each technology is, what it does in this project, and why I love it.

Tech stack to present:
- GitHub Actions
- Terraform
- CloudFront (with S3 origin)

Presentation assets to use live:
- 3-slide PPT (one slide per component)
- Repository code
- GitHub PR checks page
- AWS CloudFront console + live website URL

---

## Demo Setup Checklist (Do Before You Present)
[Action]
1. Open the PPT file.
2. Open the repo in your editor.
3. Open GitHub repo in browser.
4. Open AWS Console and log in.
5. Keep one browser tab ready for the CloudFront website URL.

[Action]
Have these files/tabs ready to click quickly:
- `.github/workflows/ci.yml`
- `test/smoke.test.mjs`
- `infra/main.tf`
- A PR that shows checks running
- CloudFront distribution page

---

## Opening (30-45 seconds)
[Dialogue]
"This semester, three tools changed how I think about building software: GitHub Actions, Terraform, and CloudFront. I want to show what each one is, what it does in my project, and why I genuinely love using it."

[Action]
- Show Slide 1 title area first.
- Then briefly show repo root so audience sees this is a real project.

---

## Slide 1: GitHub Actions

### Part A: What it is
[Dialogue]
"GitHub Actions is CI/CD inside GitHub. It automatically runs workflows when events happen, like pull requests and merges."

[Action]
- Stay on Slide 1 and point to the `What it is` bullet.

### Part B: What it does in this project
[Dialogue]
"In my project, on every PR it creates a tiny static build and runs one smoke test. On pushes to main, it first applies Terraform to create or update infrastructure, then deploys to S3 and invalidates CloudFront."

[Action]
- Switch from PPT to code.
- Open `.github/workflows/ci.yml`.
- Show these lines of code:
  - Lines 3-6: workflow triggers (`pull_request` and push to `main`).
  - Lines 22-28: static build + smoke test.
  - Lines 30-72: main-only infrastructure steps (AWS creds, Terraform apply, output loading).
  - Lines 74-80: deploy steps (S3 sync + CloudFront invalidation).

### Part C: Why I love it
[Dialogue]
"I love GitHub Actions because it removes guesswork. Every PR is checked the same way, and deployment is consistent instead of manual."

[Action]
- Go to GitHub -> Pull Requests.
- Open a PR.
- Open Checks/Actions.
- Point to the workflow run and the smoke test step.

[Dialogue]
"This is my proof that quality checks are automatic, not just a promise in documentation."

---

## Slide 2: Terraform

### Part A: What it is
[Dialogue]
"Terraform is infrastructure as code. Instead of manually clicking around the cloud console, I define cloud infrastructure in code and version it in Git."

[Action]
- Switch to Slide 2.

### Part B: What it does in this project
[Dialogue]
"This project uses one Terraform file to define a private S3 bucket, a CloudFront distribution, secure access between them, and outputs for deployment steps."

[Action]
- Switch from PPT to code.
- Open `infra/main.tf`.
- Show these lines of code:
  - Lines 16-18: S3 bucket resource.
  - Lines 29-34: CloudFront Origin Access Control.
  - Lines 36-70: CloudFront distribution config.
  - Lines 72-94: S3 bucket policy so only CloudFront can read objects.
  - Lines 96-105: outputs (`s3_bucket_name`, `cloudfront_distribution_id`, `cloudfront_domain_name`).

### Part C: Why I love it
[Dialogue]
"I love Terraform because infrastructure becomes reviewable and repeatable. I can open a PR and clearly show exactly what cloud resources are changing."

[Action]
- Optional terminal proof:
  - Run `terraform -chdir=infra plan`.
- If output is too long, just show first section and resource summary.

---

## Slide 3: CloudFront (with S3)

### Part A: What it is
[Dialogue]
"CloudFront is AWS’s content delivery network. It serves my static site through edge locations globally."

[Action]
- Switch to Slide 3.

### Part B: What it does in this project
[Dialogue]
"My static files are stored in S3, and CloudFront is the public URL users hit. S3 is kept private, and CloudFront is authorized to fetch and cache those files."

[Action]
- Switch to AWS Console.
- Go to CloudFront -> Distributions.
- Open your distribution.
- Point to distribution details.

### Part C: Why I love it
[Dialogue]
"I love CloudFront because it gives me performance and reliability with very little extra complexity. It makes a small project feel production-grade."

[Action]
- Click the distribution domain name URL.
- Show the live webpage.
- Go back to distribution -> Invalidations.
- Show recent invalidation to connect it back to the GitHub Actions deploy step.

---

## End-to-End Flow (60-90 seconds)
[Dialogue]
"End-to-end, this is the full lifecycle: I open a PR, GitHub Actions runs build and test, I merge to main, deployment runs automatically, CloudFront cache is invalidated, and users get the updated site from the CloudFront URL."

[Action]
1. Show PR checks as green.
2. Show `main` workflow run with deploy steps.
3. Show CloudFront invalidation entry.
4. Show live webpage URL loading successfully.

---

## Closing (20-30 seconds)
[Dialogue]
"These are the three technologies I wanted to highlight from this semester because they each solved a real problem for me: GitHub Actions for automation, Terraform for reproducible infrastructure, and CloudFront for fast, secure delivery."

[Dialogue]
"Together, they turned my project from just code into a complete workflow from PR to production."

---

## Backup Lines (If Something Fails Live)
[Dialogue]
"If this live step is slow, the key point is still visible in code and logs: PRs run build and test, main runs deploy, and CloudFront serves the final site."

[Action]
Fallback evidence order:
1. Show `.github/workflows/ci.yml` deploy conditions.
2. Show successful historical Actions run on `main`.
3. Show Terraform outputs in `infra/main.tf`.
4. Show CloudFront distribution domain in AWS console.

---

## Do Not Forget
[Action]
- Do not show secrets in GitHub settings.
- Keep your terminal text zoomed so audience can read.
- On each slide: pause after "what it is", "what it does", and "why I love it".
- Keep each live proof short and intentional.
