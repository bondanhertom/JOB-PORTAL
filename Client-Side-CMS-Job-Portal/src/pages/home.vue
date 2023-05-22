
<script>
export default {
    props: ["jobs", "companies", "histories"],
};   
</script>

<template>
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mx-auto" id="dashboard-section">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="display-5">Dashboard</h1>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Total Jobs</h6>
                        <h6 class="card-title card-number">{{ jobs.length }}</h6>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Total Companies</h6>
                        <h6 class="card-title card-number">{{ companies.length }}</h6>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Total Histories</h6>
                        <h6 class="card-title card-number">{{ histories.length }}</h6>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
.card {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.card-body {
    padding: 0;
    margin: 0;
}

.card-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.card-subtitle {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #6c757d;
}

.card-number {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0;
}

.display-5 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
