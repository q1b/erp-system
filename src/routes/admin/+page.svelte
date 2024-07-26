<script lang="ts">
	import { LeafIcon } from "lucide-svelte";
	import { button } from "../design-system/css";


</script>

        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:flex sm:space-x-5">
            <div class="flex-shrink-0">
               <LeafIcon class="size-20"/>
            </div>
            <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p class="text-sm font-medium text-gray-600">Welcome back,</p>
              <p class="text-xl font-bold text-gray-900 sm:text-2xl">Adminstrator</p>
              <p class="text-sm font-medium text-gray-600">Human Resources Manager</p>
            </div>
          </div>
          <div class="mt-5 flex justify-center sm:mt-0">
            <a href="#" class={button}>View profile</a>
          </div>
        </div>