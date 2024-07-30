<script lang="ts">
	import DataTable from './data-table.svelte';
</script>

<!-- 
data-table.svelte will contain the <Table /> component all of our data table logic.
data-table-actions.svelte will contain the actions menu for each row.
data-table-checkbox.svelte will contain the checkbox for each row.
+page.svelte is where we'll render and access <DataTable /> component. -->
<div class="container mx-auto py-10">
	<section class="p-10">
		<DataTable />
	</section>
</div>
